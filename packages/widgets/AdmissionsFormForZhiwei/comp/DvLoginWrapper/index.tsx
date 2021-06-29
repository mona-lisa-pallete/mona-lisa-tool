import { View } from '@tarojs/components';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import './index.less';

enum LOGIN_TYPE {
  SMS_LOGIN,
  PASSWORD_LOGIN,
}

type CompProps = {
  onLoginFail?: Function;
  onLoginSuccess?: Function;
  onInputPhone?: Function;
  onGetVerify?: Function;
  loginTip: string;
};
const LoginFormWrapper = (props: CompProps) => {
  const { onLoginFail, onLoginSuccess, onInputPhone, onGetVerify } = props;
  const [currentMethod, setCurrentMethod] = useState(LOGIN_TYPE.SMS_LOGIN);

  return (
    <View className="login_form_wrapper">
      <View className="login_method_wrap">
        {/* <View
          onClick={() => setCurrentMethod(LOGIN_TYPE.SMS_LOGIN)}
          className={`login_method ${
            currentMethod === LOGIN_TYPE.SMS_LOGIN ? 'active' : ''
          }`}
        >
          验证码登录
        </View> */}
        {/* <View className='sep_mark'>|</View>
        <View
          onClick={() => setCurrentMethod(LOGIN_TYPE.PASSWORD_LOGIN)}
          className={`login_method ${
            currentMethod === LOGIN_TYPE.PASSWORD_LOGIN ? 'active' : ''
          }`}
        >
          密码登录
        </View> */}
      </View>

      <View className="login_tip">
        {props.loginTip}
      </View>
      <LoginForm
        onGetVerify={onGetVerify}
        onInputPhone={onInputPhone}
        onLoginFail={onLoginFail}
        onLoginSuccess={onLoginSuccess}
      />
      <View className="user-agreement">
        “登录”表示您同意<a href="https://wx.guorou.net/m/policy" target="_blank">用户协议</a>和<a href="https://wx.guorou.net/m/privacy" target="_blank">隐私政策</a>
      </View>
    </View>
  );
};

export default LoginFormWrapper;
