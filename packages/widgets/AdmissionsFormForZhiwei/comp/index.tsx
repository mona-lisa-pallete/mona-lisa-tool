import { Button, View } from "@tarojs/components";
import Taro from '@tarojs/taro';
import React, { useCallback, useState } from "react";
import Address from './address';
import LoginFormWrapper from './DvLoginWrapper';
import FormComponent from './form';

import "./index.less";


/**
 * props 由自定义的 form 表单传入
 */
interface AdmissionsFormForZhiweiProps {}

const AdmissionsFormForZhiwei: React.FC<AdmissionsFormForZhiweiProps> = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const onLogin = useCallback(() => {
    setIsLogin(true);
  }, []);

  const onAddressChange = useCallback(() => {
    console.log('地址变动');
  }, []);

  return <View className="admissions-form-for-zhiwei">
    {!isLogin &&  <LoginFormWrapper
        onLoginSuccess={() => {
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
      />}
    <FormComponent />
    <Address defaultValue={{}} onChange={onAddressChange}/>
    <Button onClick={() => setIsLogin(false)} className="submit-btn">立即报名</Button>
  </View>;
};

export default AdmissionsFormForZhiwei;
