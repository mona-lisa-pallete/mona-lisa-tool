import * as core from '@gr-davinci/core';
import { Button, Input, View } from '@tarojs/components';
import { showToast, request } from '@tarojs/taro';
import React, { useState } from 'react';
import useCountDown from './hooks/useCountDown';
import useFocus from './hooks/useFocus';
import './LoginForm.less';

type CompProps = {
  onLoginFail?: Function;
  onLoginSuccess?: Function;
  onInputPhone?: Function;
  onGetVerify?: Function;
};
const sellApiHost = 'https://sellapi.guorou.net';
export const registerLoginSms = `${sellApiHost}/sellapi/1/auth/register_login_sms`;
export const registerLogin = `${sellApiHost}/sellapi/1/auth/register_login`;

export async function signIn(params) {
  try {
    const { data: res }: any = await request({
      method: 'POST',
      url: registerLogin,
      data: {
        username: '',
        role: 3,
        register_source: 'test',
        ...params,
      },
    });
    const { data, code, msg } = res;

    if (Number(code) === 0) {
      const user = data?.user || {};
      const userInfo: UserInfoType = {
        phoneNumber: user?.phone,
        accessToken: user?.access_token,
        userId: user?.id,
        userName: user?.username,
        avatar: user?.avatar_url,
        registerActivity: user?.register_activity,
        registerSource: user?.register_source,
        // openid: getOpenId(data) || '',
      };
      return userInfo;
    }
    return Promise.reject(msg);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function getSignInSms(
  params: {
    phone: string;
    register_activity: string;
    register_source: string;
  },
  isByPhoneCall = false,
) {
  const mergedParams = {
    role: 3,
    type: isByPhoneCall ? 1 : 0,
    register_source: 'test',
    ...params, // 邀请有奖活动会设置覆盖 activity 场景
  };

  try {
    const { data: res }: any = await request({
      method: 'POST',
      url: registerLoginSms,
      data: mergedParams,
    });

    if (Number(res.code) === 0) {
      return res.data;
    }
    return Promise.reject(res.msg);
  } catch (e) {
    return Promise.reject(e);
  }
}

export const removeSpaces = (string) =>
  string ? string.replace(/\s+/g, '') : '';

export function checkPhone(
  phone: string,
  noPhoneText: string,
  formatWrongText?: string,
) {
  const noSpacesPhone = removeSpaces(phone);
  if (!noSpacesPhone) {
    return noPhoneText || '手机号不得为空';
  }
  if (!/^1\d{10}$/.test(noSpacesPhone)) {
    return formatWrongText || '手机号格式有误';
  }
  return null;
}

export function checkVerifyCode(code) {
  const noSpacesCode = removeSpaces(code);
  if (!noSpacesCode) {
    return '验证码不得为空';
  }
  if (!/^\d{5}$/.test(noSpacesCode)) {
    return '验证码格式有误';
  }
  return null;
}
export type UserInfoType = {
  accessToken?: string;
  userId?: string;
  isLogin?: boolean;
  openid?: string | null;
  phoneNumber?: string;
  avatar?: string;
  nickname?: string;
  userName?: string;
  session_id?: string;
  session_key?: string;
  unionid?: string;
  isNewUser?: boolean;
  clickId?: string;
  registerSource?: string;
  registerActivity?: string;
  freeCouponCount?: number; // 不持久化
};

export function checkIsLogin(data: UserInfoType) {
  return !!(
    data &&
    data.accessToken &&
    data.accessToken !== 'null' &&
    data.accessToken !== 'undefined' &&
    data.userId &&
    data.userId !== 'null' &&
    data.userId !== 'undefined' &&
    data.phoneNumber &&
    data.phoneNumber !== 'null' &&
    data.phoneNumber !== 'undefined'
  );
}

const LoginForm = (props: CompProps) => {
  const { onLoginFail, onLoginSuccess, onInputPhone, onGetVerify } = props;

  const [VerifyCodeInputRef, setVerifyCodeInputFocus] = useFocus();

  const [phone, setPhone] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [verifyCode, setVerifyCode] = useState('');
  const { setAppData } = core.getAppContext();

  const [timeLeft, start] = useCountDown(60 * 1000, 1000, () => {
    setBtnDisabled(false);
  });

  const onPhoneNumberInputChange = (event: any) => {
    const value = event.target.value.trim();
    setPhone(value);
    if (value.length === 11) {
      if (onInputPhone) {
        onInputPhone();
      }
      // 自动发送验证码
      getVerificationCode(value);
    }
  };

  // 获取验证码
  const getVerificationCode = async (phoneNumber: string) => {
    const msg = checkPhone(phoneNumber, '请填写手机号');
    if (onGetVerify) {
      onGetVerify();
    }
    if (msg) {
      showToast({
        icon: 'none',
        title: msg,
      });
      return;
    }

    start(60 * 1000);
    setBtnDisabled(true);

    try {
      showToast({
        icon: 'none',
        title: '获取验证码中..',
      });

      const data = await getSignInSms({
        phone: phoneNumber,
      });
      if (data) {
        showToast({
          icon: 'none',
          title: '验证码已发送成功！请注意查收！',
        });
      }

      setTimeout(() => {
        setVerifyCodeInputFocus();
      }, 200);
    } catch (message) {
      setBtnDisabled(false);
      start(0);
    }
  };

  const onVerifyCodeInputChange = (event) => {
    const value = event.target.value.trim();
    setVerifyCode(value);
    if (value.length === 5) {
      signInSubmit(value);
    }
  };

  const signInSubmit = async (verifyCodeStr: string) => {
    let errorMsg =
      checkPhone(phone, '请填写手机号') || checkVerifyCode(verifyCodeStr);

    if (errorMsg) {
      showToast({
        icon: 'none',
        title: errorMsg,
        duration: 2000,
      });
      return false;
    }

    showToast({
      icon: 'none',
      title: '正在登录...',
      duration: 1000,
    });
    try {
      const userInfo = await signIn({
        phone,
        verify_code: verifyCodeStr,
      });

      if (userInfo && checkIsLogin(userInfo)) {
        setAppData({
          user: userInfo,
        });
        if (onLoginSuccess) {
          onLoginSuccess(userInfo);
          core.setUserInfoFromStorage(userInfo)
        }
      } else {
        failLogin();
      }
    } catch (error) {
      console.error(error);
      failLogin();
    }
  };
  const failLogin = () => {
    showToast({
      icon: 'none',
      title: '登录失败',
    });
    if (onLoginFail) {
      onLoginFail();
    }
  };

  return (
    <View className="login_form">
      <View className="input_wrap">
        <Input
          className="phone_input"
          placeholder="请输入手机号"
          value={phone}
          maxlength={11}
          onInput={(e) => onPhoneNumberInputChange(e)}
        />

        <View className="input_right">
          <View
            className="icon icon-ic_close2 clear_btn"
            onClick={() => setPhone('')}
          />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
        }}
      >
        <View className="input_wrap verify-code-input">
          <Input
            className="phone_input"
            placeholder="请输入验证码"
            value={verifyCode}
            maxlength={11}
            ref={VerifyCodeInputRef}
            onInput={(e) => onVerifyCodeInputChange(e)}
          />

          <View className="input_right">
            <View
              className="icon icon-ic_close2 clear_btn"
              onClick={() => setVerifyCode('')}
            />
          </View>
        </View>
        <Button
          plain
          className="verification_btn"
          onClick={() => {
            if (!btnDisabled) {
              getVerificationCode(phone);
            }
          }}
          disabled={btnDisabled}
        >
          {timeLeft.time > 0 ? `${timeLeft.time / 1000}s` : '获取验证码'}
        </Button>
      </View>
      <Button
        plain
        className="btn_submit"
        onClick={() => signInSubmit(verifyCode)}
      >
        登录
      </Button>
    </View>
  );
};

export default LoginForm;
