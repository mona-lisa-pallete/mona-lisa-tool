import { Form, Input } from "antd";
import React, { ReactNode, useEffect, useRef } from "react";
import "./form.less";

interface DvImageFormProps {
  initialValues: any;
  onChange: (allValues: any) => void;
  platformCtx: any;
}

const DvButtonForm: React.FC<DvImageFormProps> = (props) => {
  const { onChange, initialValues, platformCtx } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      className="dv-image-form"
      onValuesChange={(_:any, allVal: any)=>{
        onChange(allVal)
      }}
    >
      <div className="dv-image-form__sub-title">基础配置</div>
      <Form.Item name="title" label="组件名称">
        <Input />
      </Form.Item>
      <Form.Item name="url" label="图片素材">
        <platformCtx.ui.Upload />
      </Form.Item>
    </Form>
  );
};

export default DvButtonForm;
