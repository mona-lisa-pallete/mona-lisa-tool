//@ts-ignore
import * as core from '@gr-davinci/core';
import { Textarea } from '@tarojs/components';
import './AddressDetailTextarea.less';
import React from 'react'
import { IErrorTip } from '../../types';

function AddressDetailTextarea(props) {
  const { state, setAppData } = core.getAppContext();
  const errorTip = state.errorTip as IErrorTip || {};
  const { value, onChange, placeholder } = props;

  return (
    <Textarea
      className={`address_detail_text ${errorTip.contactAddress ? 'error-tip' : ''}`}
      value={value}
      placeholder={placeholder || "请输入详细地址"}
      onInput={onChange}
      maxlength={150}
      onClick={() => {
        errorTip.contactAddress && setAppData({ errorTip: {...errorTip, contactAddress: null}});
      }}
    />
  );
}

export default AddressDetailTextarea;
