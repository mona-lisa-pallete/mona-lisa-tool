import { Button, View } from "@tarojs/components";
import Taro from '@tarojs/taro';
import React, { useCallback, useState } from "react";
import * as core from '@gr-davinci/core'
import Address from './address';
import LoginFormWrapper from './DvLoginWrapper';
import FormComponent from './form';
import { getOfflineData, checkUserQualification, createOrder, bindUserSchool, postToOffline, createAddress } from "./api";
import { setLocalCache } from './utils';
import { orderDetailUrl, source, activity, sellType } from './const';
import { OfflineData, IFormData } from './types';
import "./index.less";
import { useEffect } from "react";
import { UserInfoType } from './DvLoginWrapper/LoginForm';
import useLocal from './useLocal';

/**
 * props 由自定义的 form 表单传入
 */
interface AdmissionsFormForZhiweiProps {}

const AdmissionsFormForZhiwei: React.FC<AdmissionsFormForZhiweiProps> = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [qualificationTip, setQualificationTip] = useState(null);
  const [confirmFail, setConfirmFail] = useState(false);
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
    address: '',
    contactName: '',
    contactPhone: '',
    skuId: null,
  });
  const { state } = core.getAppContext() ;
  const userInfo = state.userInfo as UserInfoType;
  useEffect(() => {
      if (userInfo?.userId) {
        Taro.showToast({title: '已登录'})
        setIsLogin(true);
      } else {
        Taro.showToast({
          title: '未登录',
          icon: 'none'
        })
        setIsLogin(false);
      }
  }, [userInfo?.userId])
  useEffect(() => {
    Taro.showLoading();
    const getData = async () => {
      const data = await getOfflineData();
      setOfflineData(data);
      Taro.hideLoading();
    };
    getData();
  }, []);

  /* 将表单数据缓存，下次进入直接使用 */
  useEffect(() => {
    setLocalCache('local-form-data', formData);
  }, [formData]);

  const onLogin = useCallback(async (userInfo: UserInfoType) => {

    try {
      await checkUserQualification();
    } catch (err) {
      setQualificationTip(err.message || '抱歉，您暂时没有该活动的体验资格～');
    }
  }, []);

  const onAddressChange = useCallback(() => {
    console.log('地址变动');
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
    if (offlineData.show_clazz && offlineData.clazz_necessary && !formData.clazz) {
      /* 班级必填 */
      return false;
    }
    if (!formData.name) {
      /* 名字必填 */
      return false;
    }
    if (!formData.skuId) {
      /* 选课必填 */
      return false;
    }
    if (!formData.contactName || !formData.contactPhone) {
      /* 联系人必填 */
      return false;
    }
    if (!formData.address) {
      /* 地址必填 */
      return false;
    }
    return true;
  }, [formData, offlineData]);

  const onSubmit = useCallback(async () => {
    if (!canSubmit()) return;
    try {
      Taro.showLoading({ title: '订单提交中' });
      /* TODO: 创建地址接口 */
      const addressId = await createAddress({
        contact_name: '',
        contact_phone: '',
        country: '',
        province: '',
        city: '',
        district: '',
        street: '',
        detail: ''
      });
      const orderRes = await createOrder(formData.skuId, addressId)
      if (orderRes.code === 3117) {
        Taro.showToast({ title: '该时段已报满，请选择新的上课时间或科目', icon: 'none' });
        return;
      }
      const orderId = orderRes.data.order_id;
      await Promise.all([
        /* 将学生跟学校绑定, 仅机构类型为学校时需要 */
        /* TODO: 这里学校类型需要确认 */
        offlineData.institution_type === '1' ? bindUserSchool(userInfo.userId, offlineData.school_id) : Promise.resolve(),
        /* 将数据保存到线下 */
        postToOffline({
          url: window.location.href,
          phone: userInfo.phoneNumber,
          name: formData.name,
          contactName: formData.contactName,
          contactPhone: formData.contactPhone,
          contactAddress: /* TODO: 地址 */'',
          provinceId: /* TODO: 省份id */'',
          cityId: /* TODO: 城市id */'',
          regionId: /* TODO: 区县id */'',
          clazz: formData.clazz || '', /* 班级 */
          schoolId: offlineData.school_id,
        }),
        /* TODO: 将数据提交到达芬奇 */
      ]);
      /* 创建订单成功，跳转到订单页面 */
      window.location.href = /* TODO: 跳转订单详情, 这里获取跳转链接需要做环境判断 */orderDetailUrl + orderId;
    } catch {
      setConfirmFail(true);
    }
    Taro.hideLoading();
  }, [formData, offlineData, userInfo]);

  return <View className="admissions-form-for-zhiwei">
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
      formData={formData}
      offlineData={offlineData}
      setFormData={setFormData}
    />
    <Address defaultValue={{}} onChange={onAddressChange}/>
    <Button onClick={onSubmit} className={`submit-btn ${canSubmit() ? '' : 'disable-btn'}`}>立即报名</Button>
  </View>;
};

export default AdmissionsFormForZhiwei;
