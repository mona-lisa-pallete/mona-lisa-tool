// @ts-ignore
import * as core from '@monalisa-lowcode/core';
import { Button, Input, View } from '@tarojs/components';
import { showToast, request } from '@tarojs/taro';
import React, { useState } from 'react';
import useCountDown from './hooks/useCountDown';
import useFocus from './hooks/useFocus';
import './LoginForm.less';
import { currentApiHost } from '../api';
import { source, activity } from '../const';
import * as  admissionsTracker from '../utils/admissionsTracker';

type CompProps = {
  onLoginFail?: Function;
  onLoginSuccess?: Function;
  onInputPhone?: Function;
  onGetVerify?: Function;
};
const sellApiHost = currentApiHost.sell_api; // 'https://sellapi.guorou.net';
export const registerLoginSms = `${sellApiHost}/sellapi/1/auth/register_login_sms`;
export const registerLogin = `${sellApiHost}/sellapi/1/auth/register_login`;

export async function signIn(params) {
  try {
    const { data: res }: any = await request({
      method: 'POST',
      url: registerLogin,
      credentials: 'include',
      data: {
        username: '',
        role: 3,
        register_source: source,
        register_activity: activity,
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
    register_activity?: string;
    register_source?: string;
  },
  isByPhoneCall = false,
) {
  const mergedParams = {
    role: 3,
    type: isByPhoneCall ? 1 : 0,
    register_source: source,
    register_activity: activity,
    ...params, // ????????????????????????????????? activity ??????
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
    return noPhoneText || '?????????????????????';
  }
  if (!/^1\d{10}$/.test(noSpacesPhone)) {
    admissionsTracker.track_phonenumber_fail(phone);
    return formatWrongText || '?????????????????????';
  }
  return null;
}

export function checkVerifyCode(code) {
  const noSpacesCode = removeSpaces(code);
  if (!noSpacesCode) {
    return '?????????????????????';
  }
  if (!/^\d{5}$/.test(noSpacesCode)) {
    return '?????????????????????';
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
  freeCouponCount?: number; // ????????????
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
      admissionsTracker.track_phonenumber_success()
      if (onInputPhone) {
        onInputPhone();
      }
      admissionsTracker.track_verification_code_send();

      // ?????????????????????
      getVerificationCode(value);
    }
  };

  // ???????????????
  const getVerificationCode = async (phoneNumber: string) => {
    const msg = checkPhone(phoneNumber, '??????????????????');
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
        title: '??????????????????..',
      });

      const data = await getSignInSms({
        phone: phoneNumber,
      });
      if (data) {
        showToast({
          icon: 'none',
          title: '?????????????????????????????????????????????',
        });
      }

      setTimeout(() => {
        (setVerifyCodeInputFocus as Function)();
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
      checkPhone(phone, '??????????????????') || checkVerifyCode(verifyCodeStr);

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
      title: '????????????...',
      duration: 1000,
    });
    try {
      const userInfo = await signIn({
        phone,
        verify_code: verifyCodeStr,
      });

      if (userInfo && checkIsLogin(userInfo)) {
        setAppData({
          userInfo,
        });
        core.setUserData(userInfo);
        admissionsTracker.track_login_success();
        if (onLoginSuccess) {
          onLoginSuccess(userInfo);
          core.setUserInfoFromStorage(userInfo);
        }
      } else {
        failLogin();
        admissionsTracker.track_verification_code_fail(phone, verifyCodeStr)
      }
    } catch (error) {
      console.error(error);
      admissionsTracker.track_verification_code_fail(phone, verifyCodeStr)
      failLogin();
    }
  };
  const failLogin = () => {
    showToast({
      icon: 'none',
      title: '????????????',
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
          placeholder="??????????????????"
          type="number"
          value={phone}
          maxlength={11}
          onInput={(e) => onPhoneNumberInputChange(e)}
          onFocus={admissionsTracker.track_phonenumber_focus}
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
            placeholder="??????????????????"
            type="number"
            value={verifyCode}
            maxlength={5}
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
              admissionsTracker.track_verification_code_resend();
              getVerificationCode(phone);
            }
          }}
          disabled={btnDisabled}
        >
          {timeLeft.time > 0 ? `${timeLeft.time / 1000}s` : '???????????????'}
        </Button>
      </View>
      <Button
        plain
        className="btn_submit"
        onClick={() => signInSubmit(verifyCode)}
      >
        ??????
      </Button>
    </View>
  );
};

export default LoginForm;
