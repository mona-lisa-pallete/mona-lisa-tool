import { Button, View } from "@tarojs/components";
import Taro from '@tarojs/taro';
import React, { useCallback, useState } from "react";
import Address from './address';
import LoginFormWrapper from './DvLoginWrapper';
import FormComponent from './form';
import { getOfflineData, checkUserQualification, getDetailData } from "./api";

import "./index.less";
import { useEffect } from "react";


export interface ContentData {
  institution_name: string;
  show_institution_name: boolean;
  show_clazz: boolean;
  clazz_necessary: boolean;
  grades: number[];
}

/**
 * props 由自定义的 form 表单传入
 */
interface AdmissionsFormForZhiweiProps {}

const AdmissionsFormForZhiwei: React.FC<AdmissionsFormForZhiweiProps> = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginFailTip, setLoginFailTip] = useState(null);
  const [constData, setConstData] = useState({
    institution_name: '',
    show_institution_name: false,
    show_clazz: false,
    clazz_necessary: false,
    grades: [],
  });
  const [formData, _setFormData] = useState({
    name: '',
    grade: null,
    subject: null,
    clazz: '',
    time: null,
    address: '',
    contactName: '',
    contactPhone: '',
  });

  useEffect(() => {
    const getData = async () => {
      const data = await getOfflineData();
      setConstData({
        institution_name: data.institution_name,
        show_institution_name: data.show_institution_name,
        show_clazz: data.show_clazz,
        clazz_necessary: data.clazz_necessary,
        grades: data.grades,
      });
    };
    getData();
  }, []);

  const onLogin = useCallback(async () => {

    try {
      await checkUserQualification();
    } catch (err) {
      setLoginFailTip(err.message);
    }
    setIsLogin(true);
  }, []);

  const onAddressChange = useCallback(() => {
    console.log('地址变动');
  }, []);

  const getLoginTip = useCallback(() => {
    if (constData.show_institution_name) {
      return `${constData.institution_name}邀请您登录，获得果肉公益课`;
    } else {
      return '亲爱的家长，为了给您提供更好的服务，请先登录您的手机号';
    }
  }, [constData]);

  const setFormData = useCallback((key: string, value: any) => {
    formData[key] = value;
    _setFormData({ ...formData });
  }, [formData]);

  return <View className="admissions-form-for-zhiwei">
    {loginFailTip && <View className="login-fail-tip">
        <View className="login-fail-container">
          <View className="login-fail-title">提示</View>
          <View className="login-fail-content">{loginFailTip || '抱歉，您暂时没有该活动的体验资格～'}</View>
          <View className="login-fail-recommend">其他活动正在进行中，快去看看吧</View>
          <a className="login-fail-btn" href={`https://sell.guorou.net/m/multiple-subject?sell_type=autumn_2021_FromZJ_JcQf7K&activity=2021_qiu_xx&source=`}>去看看</a>
        </View>
      </View>}
    {!isLogin &&  <View className="login-container"><LoginFormWrapper
        loginTip={getLoginTip()}
        onLoginSuccess={() => {
          onLogin();
          Taro.showToast({
            title: '登录成功',
          });
        }}
        onLoginFail={() => {
          Taro.showToast({
            title: '登录失败',
            icon: 'none',
          });
        }}
      /></View>}
    <FormComponent
      formData={formData}
      constData={constData}
      setFormData={setFormData}
    />
    <Address defaultValue={{}} onChange={onAddressChange}/>
    <Button onClick={() => setIsLogin(false)} className="submit-btn">立即报名</Button>
  </View>;
};

export default AdmissionsFormForZhiwei;
