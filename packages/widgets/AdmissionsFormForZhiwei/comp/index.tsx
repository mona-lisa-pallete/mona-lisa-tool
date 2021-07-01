import { Button, View } from "@tarojs/components";
import Taro from '@tarojs/taro';
import React, { useCallback, useState } from "react";
// @ts-ignore
import * as core from '@gr-davinci/core';
import LoginFormWrapper from './DvLoginWrapper';
import FormComponent from './form';
import { getOfflineData, checkUserQualification, createOrder, bindUserSchool, postToOffline, createAddress, currentApiHost } from "./api";
import { source, activity, sellType, gradesMap } from './const';
import { OfflineData, IFormData, IErrorTip } from './types';
import "./index.less";
import { useEffect } from "react";
import { UserInfoType } from './DvLoginWrapper/LoginForm';
import useLocal from './useLocal';

/**
 * props 由自定义的 form 表单传入
 */
interface AdmissionsFormForZhiweiProps {
  edit?: boolean;
}

const AdmissionsFormForZhiwei: React.FC<AdmissionsFormForZhiweiProps> = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [qualificationTip, setQualificationTip] = useState(null);
  const [confirmFail, setConfirmFail] = useState(false);
  const [errorTip, setErrorTip] = useState<IErrorTip>({});
  const [offlineData, setOfflineData] = useState<OfflineData>({
    institution_name: '',
    show_institution_name: false,
    show_clazz: false,
    clazz_necessary: false,
    grades: [],
    subjects: [],
    time_seqs: [],
    school_id: null,
    institution_type: null,
  });
  const [formData, _setFormData] = useLocal<IFormData>('dv-localFormData', {
    name: '',
    grade: null,
    subject: null,
    clazz: '',
    time: null,
    contactName: '',
    contactPhone: '',
    skuId: null,
    product: '',
  });
  const { state } = core.getAppContext();
  const userInfo = state.userInfo as UserInfoType || {};
  useEffect(() => {
    console.log('全局用户数据', userInfo);
    if (userInfo?.userId) {
      Taro.showToast({title: '已登录'})
      setIsLogin(true);
      const checkFn = async () => {
        try {
          await checkUserQualification();
        } catch (err) {
          setQualificationTip('抱歉，您暂时没有该活动的体验资格～');
        }
      };
      checkFn();
    } else {
      // Taro.showToast({
      //   title: '未登录',
      //   icon: 'none'
      // })
      // FIXME
      // setIsLogin(false);
    }
  }, [userInfo])
  useEffect(() => {
    Taro.showLoading();
    const getData = async () => {
      try {
        const data = await getOfflineData();
        const oldGrades = data.grades;
        data.grades = oldGrades.map(grade => gradesMap[grade]);
        setOfflineData(data);
      } catch {
        Taro.showToast({ title: '获取页面数据失败，请刷新页面', icon: 'none' });
      }
      Taro.hideLoading();
    };
    getData();
  }, []);

  const onLogin = useCallback(async (_userInfo: UserInfoType) => {
    // console.log('userInfo', _userInfo);
    // // userInfo.userId = _userInfo.userId;
    // // userInfo.phoneNumber = _userInfo.phoneNumber;
    // // setUserInfo(_userInfo);
    // setAppData()
    // try {
    //   await checkUserQualification();
    // } catch (err) {
    //   setQualificationTip(err.message || '抱歉，您暂时没有该活动的体验资格～');
    // }
    // setIsLogin(true);
  }, []);

  const getLoginTip = useCallback(() => {
    if (offlineData.show_institution_name) {
      return `${offlineData.institution_name}邀请您登录，获得果肉公益课`;
    } else {
      return '亲爱的家长，为了给您提供更好的服务，请先登录您的手机号';
    }
  }, [offlineData]);

  const setFormData = useCallback((obj: any) => {
      _setFormData({ ...formData, ...obj });
  }, [formData]);

  const canSubmit = useCallback(() => {
    let hasError = false;
    let _errorTip: IErrorTip = {};
    if (offlineData.show_clazz && offlineData.clazz_necessary && !formData.clazz) {
      /* 班级必填 */
      hasError = true;
      _errorTip.clazz = '请填写班级';
    }
    if (!formData.name) {
      /* 名字必填 */
      hasError = true;
      _errorTip.name = '请填写学生姓名';
    }
    if (!formData.skuId) {
      /* 选课必填 */
      hasError = true;
      _errorTip.selectTime = '请选择课程';
    }
    if (!formData.contactName) {
      /* 联系人必填 */
      hasError = true;
      _errorTip.contactName = '请填写联系人';
    }
    if (!formData.contactPhone) {
      hasError = true;
      _errorTip.contactPhone = '请填写联系方式';
    }
    if (!formData.regionName || !formData.contactAddress) {
      /* 地址必填 */
      hasError = true;
      _errorTip.address = '请填写地址';
    }
    setErrorTip(_errorTip);
    return !hasError;
  }, [formData, offlineData]);

  useEffect(() => {
    console.log('查看formData', formData);
  }, [formData]);

  const disableSubmit = useCallback(() => {
    if ((offlineData.show_clazz && offlineData.clazz_necessary && !formData.clazz) ||
      !formData.name||
      !formData.skuId ||
      !formData.contactName ||
      !formData.contactPhone
      // !formData.address
    ) {
      return false;
    } else {
      return true;
    }
  }, [formData, offlineData]);

  const onSubmit = useCallback(async () => {
    if (!canSubmit()) return;
    try {
      Taro.showLoading({ title: '订单提交中' });
      const addressId = await createAddress({
        contact_name: formData.contactName,
        contact_phone: formData.contactPhone,
        country: '中国', /* TODO: 创建地址接口 */
        province: formData.provinceName,
        city: formData.cityName,
        district: formData.regionName,
        street: '',
        detail: formData.contactAddress,
      });
      const orderRes = await createOrder(formData.skuId, addressId)
      if (orderRes.code === 3117) {
        Taro.showToast({ title: '该时段已报满，请选择新的上课时间或科目', icon: 'none' });
        return;
      }
      const orderId = orderRes.data.order.order_id;
      await Promise.all([
        /* 将学生跟学校绑定, 仅机构类型为学校时需要 */
        /* 1. 学校， 2. 企业， 3. 机构 */
        // offlineData.institution_type === 1 ? bindUserSchool(userInfo.userId, offlineData.school_id) : Promise.resolve(),
        offlineData.institution_type === 1 ? Promise.resolve() : Promise.resolve(),
        /* 将数据保存到线下 */
        postToOffline({
          url: window.location.href,
          phone: userInfo.phoneNumber,
          name: formData.name,
          contactName: formData.contactName,
          contactPhone: formData.contactPhone,
          contactAddress: formData.contactAddress,
          provinceId: formData.provinceId,
          cityId: formData.cityId,
          regionId: formData.regionId,
          clazz: formData.clazz || '', /* 班级 */
          schoolId: offlineData.school_id,
        }),
        /* TODO: 将数据提交到达芬奇 */
      ]);
      /* 创建订单成功，跳转到订单页面 */
      console.log('订单创建成功,订单id', orderId);
      window.location.href = currentApiHost.order_detail + orderId;
    } catch(err) {
      console.log('错误', err)
      setConfirmFail(true);
    }
    Taro.hideLoading();
  }, [formData, offlineData, userInfo]);

  return <View className={`admissions-form-for-zhiwei ${props.edit ? 'env-dev' : ''}`}>
    {qualificationTip && <View className="login-fail-tip">
        <View className="login-fail-container">
          <View className="login-fail-title">提示</View>
          <View className="login-fail-content">{qualificationTip}</View>
          <View className="login-fail-recommend">其他活动正在进行中，快去看看吧</View>
          <a className="login-fail-btn" href={`https://sell.guorou.net/m/multiple-subject?sell_type=${sellType}&activity=${activity}&source=${source}`}>去看看</a>
        </View>
      </View>}
    {confirmFail && <View className="login-fail-tip">
      <View className="login-fail-container">
        <View className="close-btn" onClick={() => setConfirmFail(false)}>
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2l-275.2-277.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l275.2 277.333333-277.333333 275.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333L512 556.8 787.2 832c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L556.8 512z" ></path></svg>
        </View>
        <View className="login-fail-title">提示</View>
        <View className="login-fail-content">无法报名，请联系客服：<br /><a href="tel:4008009456">400 800 9456</a></View>
      </View>
    </View>}
    {!isLogin &&  <View className="login-container"><LoginFormWrapper
        loginTip={getLoginTip()}
        onLoginSuccess={onLogin}
        onLoginFail={() => {
          // TODO: 登录失败是否需要补充什么逻辑
          Taro.showToast({
            title: '登录失败',
            icon: 'none',
          });
        }}
      /></View>}
    <FormComponent
      errorTip={errorTip}
      setErrorTip={data => setErrorTip(data)}
      formData={formData}
      offlineData={offlineData}
      setFormData={setFormData}
    />
    <Button onClick={onSubmit} className={`submit-btn ${disableSubmit() ? '' : 'disable-btn'}`}>立即报名</Button>
  </View>;
};

export default AdmissionsFormForZhiwei;
