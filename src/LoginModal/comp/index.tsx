import React, { useState, useEffect } from 'react';
import './index.less';

let time: ReturnType<typeof setTimeout>;

const LoginModal: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('获取验证码');
  const [disabled, setDisabled] = useState(false);

  const onClick = () => {
    if (phone.length !== 11) {
      alert('请输入11位手机号码！');
      return;
    }
    setDisabled(true);
    setText('60s');
  };

  const inputPhone = e => {
    setPhone(e.target.value.replace(/[^\d]/g, ''));
  };

  const cutdown = cut => {
    const s = parseInt(cut);
    if (s) {
      setText(`${s - 1}s`);
    } else {
      setDisabled(false);
      setText('获取验证码');
      clearTimeout(time);
    }
  };

  useEffect(() => {
    time = setTimeout(cutdown, 1000, text);
  }, [text]);

  return (
    <div className="login-modal">
      <input
        className="login-modal-input"
        type="tel"
        onChange={inputPhone}
        value={phone}
      />
      <button disabled={disabled} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
export default LoginModal;
