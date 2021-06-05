import { Form, Input } from "antd";
import React, { useEffect } from "react";

interface ToastActionFormProps {
  value: any;
  onChange: (value: any) => void;
}

const ToastActionForm: React.FC<ToastActionFormProps> = (props) => {
  const { value, onChange } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (value) {
      form.setFieldsValue(JSON.parse(JSON.stringify(value)));
    }
  }, [value]);

  const handleValues = (changedValues: any, values: any) => {
    if (values) {
      onChange && onChange(JSON.parse(JSON.stringify(values)));
    }
  };

  return (
    <Form form={form} onValuesChange={handleValues}>
      <Form.Item name="jumpMethod">
        <Input placeholder="h5或mini"></Input>
      </Form.Item>
      <Form.Item name="url">
        <Input />
      </Form.Item>
    </Form>
  );
};
export default ToastActionForm;
