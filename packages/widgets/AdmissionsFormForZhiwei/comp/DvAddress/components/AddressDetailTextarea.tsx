import { Textarea } from '@tarojs/components';
import './AddressDetailTextarea.less';
import React from 'react'
import * as trackerAdmissions from '../../utils/admissionsTracker'

function AddressDetailTextarea(props) {
  const { value, onChange, placeholder, errorTip, setErrorTip } = props;

  return (
    <Textarea
      className={`address_detail_text ${errorTip?.contactAddress ? 'error-tip' : ''}`}
      value={value}
      placeholder={placeholder || "请输入详细地址"}
      onInput={onChange}
      maxlength={150}
      onClick={() => {
        trackerAdmissions.track_address_input_focus();
        errorTip?.contactAddress && setErrorTip({...errorTip, contactAddress: null});
      }}
    />
  );
}

export default AddressDetailTextarea;
