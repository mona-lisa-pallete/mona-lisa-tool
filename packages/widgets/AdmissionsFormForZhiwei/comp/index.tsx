import React, { useState, useEffect, useCallback } from "react";
import { Button, View, Image } from "@tarojs/components";
import Login from './login';
import Address from './address';

import "./index.less";

/**
 * props 由自定义的 form 表单传入
 */
interface AdmissionsFormForZhiweiProps {}

const AdmissionsFormForZhiwei: React.FC<AdmissionsFormForZhiweiProps> = (props) => {
  const [isLogin, setIsLogin] = useState(false);

  const onLogin = useCallback(() => {
    setIsLogin(true);
  }, []);

  const onAddressChange = useCallback(() => {
    console.log('地址变动');
  }, []);

  return <View className="admissions-form-for-zhiwei">
    {!isLogin && <Login onLogin={onLogin} />}
    <Address defaultValue={{}} onChange={onAddressChange}/>
    <Button className="submit-btn">立即报名</Button>
  </View>;
};

export default AdmissionsFormForZhiwei;
