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
import DvTipModal from './DvTipModal';
import * as trackerAdmissions from './utils/admissionsTracker'
import { checkPhone } from './DvLoginWrapper/LoginForm';
/**
 * props 由自定义的 form 表单传入
 */
interface AdmissionsFormForZhiweiProps {
  edit?: boolean;
}

const AdmissionsFormForZhiwei: React.FC<AdmissionsFormForZhiweiProps> = (props) => {

  const { state } = core.getAppContext();
  const userInfo = state.userInfo as UserInfoType || {};
  const [isLogin, setIsLogin] = useState(userInfo?.userId ? true : false);
  const [qualificationTip, setQualificationTip] = useState(null);
  const [confirmFail, setConfirmFail] = useState(false);
  const [offlineData, setOfflineData] = useState<OfflineData>({
    institution_name: '',
    show_name: false,
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
    contactPhone: userInfo.phoneNumber || null,
    skuId: null,
    product: '',
  });
  const [errorTip, setErrorTip] = useState<IErrorTip>({});
  const setFormData = useCallback((obj: any) => {
    _setFormData({ ...formData, ...obj });
  }, [formData]);
  useEffect(() => {
    if (userInfo?.userId) {
      Taro.showToast({title: '已登录'})
      setIsLogin(true);
      if (!formData.contactPhone) {
        setFormData({ contactPhone: userInfo?.phoneNumber });
      }
      const checkFn = async () => {
        try {
          await checkUserQualification();
        } catch (err) {
          setQualificationTip('抱歉，您暂时没有该活动的体验资格～');
          trackerAdmissions.track_popup_originalclass();
        }
      };
      checkFn();
    } else {}
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

  const onLogin = useCallback(async (_userInfo: UserInfoType) => {}, []);

  const getLoginTip = useCallback(() => {
    if (offlineData.show_name) {
      return `${offlineData.institution_name}邀请您登录，获得果肉公益课`;
    } else {
      return '亲爱的家长，为了给您提供更好的服务，请先登录您的手机号';
    }
  }, [offlineData]);

  const canSubmit = useCallback(() => {
    let hasError = false;
    let _errorTip: IErrorTip = {};
    let toastText = '';
    if (!formData.contactAddress || formData.contactAddress.length <= 5) {
      hasError = true;
      toastText = _errorTip.contactAddress = '请确认详细地址不低于 5 个字';
      trackerAdmissions.track_address_input_fail();
    }

    if (!formData.regionName) {
      hasError = true;
      toastText = _errorTip.district = '请选择区县';
      trackerAdmissions.track_toast_city_error();

    }
    if (!formData.cityName) {
      hasError = true;
      toastText = _errorTip.province = '请选择省市';
      trackerAdmissions.track_toast_province_error();
    }
    const errorPhoneTip = checkPhone(formData.contactPhone, '请填写联系方式');
    if (errorPhoneTip) {
      hasError = true;
      toastText = _errorTip.contactPhone = errorPhoneTip;
    }
    if (!formData.contactName) {
      /* 联系人必填 */
      hasError = true;
      toastText = _errorTip.contactName = '请填写联系人';
      trackerAdmissions.track_username_input_fail();
    }
    if (offlineData.show_clazz && offlineData.clazz_necessary && !formData.clazz) {
      /* 班级必填 */
      hasError = true;
      toastText = _errorTip.clazz = '请填写班级';
      trackerAdmissions.track_clazz_select_fail();
    }
    if (!formData.skuId) {
      /* 选课必填 */
      hasError = true;
      toastText = _errorTip.selectTime = '请选择课程';
      trackerAdmissions.track_toast_pickcourses_error();
    }
    if (!formData.name) {
      /* 名字必填 */
      hasError = true;
      toastText = _errorTip.name = '请填写学生姓名';
      trackerAdmissions.track_username_input_fail();
    }
    if(toastText) {
      trackerAdmissions.track_course_submit_fail();
      Taro.showToast({ title: toastText, icon: 'none' });
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
      !formData.contactPhone ||
      !formData.contactAddress
    ) {
      return false;
    } else {
      return true;
    }
  }, [formData, offlineData]);

  const onSubmit = useCallback(async () => {
    trackerAdmissions.track_course_submit()
    if (!canSubmit()) return;
    try {
      Taro.showLoading({ title: '订单提交中' });
      const addressId = await createAddress({
        contact_name: formData.contactName,
        contact_phone: formData.contactPhone,
        country: '中国',
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
        offlineData.institution_type === 1 ? bindUserSchool(userInfo.userId, offlineData.school_id) : Promise.resolve(),
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
      trackerAdmissions.track_course_submit_success();
      setTimeout(() => {
        window.location.href = currentApiHost.order_detail + orderId;
      }, 100);
    } catch(err) {
      trackerAdmissions.track_course_submit_fail();
      console.log('错误', err)
      setConfirmFail(true);
    }
    Taro.hideLoading();
  }, [formData, offlineData, userInfo]);

  return <View className={`admissions-form-for-zhiwei ${props.edit ? 'env-dev' : ''}`}>
    {qualificationTip && <DvTipModal
      foot={<View onClick={() => {
        trackerAdmissions.track_popup_originalclass_click();
        const href=`https://sell.guorou.net/m/multiple-subject?sell_type=${sellType}&activity=${activity}&source=${source}`;
        setTimeout(() => {
          window.location.href = href;
        }, 100);

      }} className="login-fail-btn" >去看看</View>}
    >
      <View className="login-fail-content">
        <View>{qualificationTip}</View>
        <View>其他活动正在进行中，快去看看吧</View>
      </View>
    </DvTipModal>}
    {confirmFail && <DvTipModal closeHandle={() => setConfirmFail(false)}>
    <View className="login-fail-content">无法报名，请联系客服：<br /><a href="tel:4008009456">400 800 9456</a></View>
    </DvTipModal>}
    {!isLogin &&  <View className="login-container dv-modal"><LoginFormWrapper
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
    <View className="fixed-bottom-btn">
      <Button onClick={onSubmit} className="submit-btn">立即报名</Button>
    </View>
  </View>;
};

export default AdmissionsFormForZhiwei;
