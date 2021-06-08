import { Form, Input } from "antd";
import React, { ReactNode, useEffect } from "react";
import "./form.less";

interface DvImageFormProps {
  initialValues: any;
  onChange: (changedValues: any) => void;
  actionRender: React.Component | ReactNode;
  platformCtx: any;
}

const DvImageForm: React.FC<DvImageFormProps> = (props) => {
  const { onChange, platformCtx, initialValues, actionRender } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Form layout="vertical" className="dv-image-form" onValuesChange={onChange}>
      <div className="dv-image-form__sub-title">基础配置</div>
      <Form.Item name="title" label="组件名称">
        <Input />
      </Form.Item>
      <Form.Item name="text" label="按钮文字">
        <Input />
      </Form.Item>
      <Form.Item name="url" label="图片素材">
        <platformCtx.ui.UploadTool
          onSelected={(selectResult) => {
            form.setFieldsValue({
              url: selectResult.url,
            });
            onChange({
              url: selectResult.url,
            });
          }}
          onSelectedMaterial={(selectResult) => {
            form.setFieldsValue({
              url: selectResult.url,
            });
            onChange({
              url: selectResult.url,
            });
          }}
        />
      </Form.Item>
      {actionRender}
    </Form>
  );
};

export default DvImageForm;
