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
};
const LoginFormWrapper = (props: CompProps) => {
  const { onLoginFail, onLoginSuccess, onInputPhone, onGetVerify } = props;
  const [currentMethod, setCurrentMethod] = useState(LOGIN_TYPE.SMS_LOGIN);

  return (
    <View className="login_form_wrapper">
      <View className="login_method_wrap">
        <View
          onClick={() => setCurrentMethod(LOGIN_TYPE.SMS_LOGIN)}
          className={`login_method ${
            currentMethod === LOGIN_TYPE.SMS_LOGIN ? 'active' : ''
          }`}
        >
          验证码登录
        </View>
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
        为了给您提供更好的服务，请先登录您的手机号
      </View>
      <LoginForm
        onGetVerify={onGetVerify}
        onInputPhone={onInputPhone}
        onLoginFail={onLoginFail}
        onLoginSuccess={onLoginSuccess}
      />
    </View>
  );
};

export default LoginFormWrapper;
