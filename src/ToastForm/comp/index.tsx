import { Form, Input, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import './index.less';

interface ToastActionFormProps {
  value: any;
  onChange: (value: any) => void;
}

enum JumpMethod {
  H5 = 'h5',
  Mini = 'mini',
}

const ToastActionForm: React.FC<ToastActionFormProps> = (props) => {
  const { value, onChange } = props;
  const [form] = Form.useForm()

  useEffect(() => {
    if (value) {
      form.setFieldsValue(JSON.parse(JSON.stringify(value)));
    }
  }, [value]);

  const handleValues = (changedValues: any, values: any) => {
    if (values) {
      onChange && onChange(JSON.parse(JSON.stringify(values)))
    }
  };

  return (
    <div className="dv-form link-action-form">
      <Form form={form}  onValuesChange={handleValues}>
        <Form.Item name="msg">
          <Input maxLength={20}></Input>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ToastActionForm;
