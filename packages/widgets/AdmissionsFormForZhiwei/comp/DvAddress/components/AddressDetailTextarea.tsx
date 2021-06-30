import { Textarea } from '@tarojs/components';
import './AddressDetailTextarea.less';
import React from 'react'

function AddressDetailTextarea(props) {
  const { value, onChange, placeholder } = props;

  return (
    <Textarea
      className="address_detail_text"
      value={value}
      placeholder={placeholder}
      onInput={onChange}
      maxlength={150}
    />
  );
}

export default AddressDetailTextarea;
