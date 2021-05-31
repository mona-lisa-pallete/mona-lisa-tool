import { Form, Input } from "antd";
import React, { ReactNode, useEffect } from "react";
import "./form.less";

interface DvImageFormProps {
  data: any;
  onChange: (changedValues: any, allValues: any) => void;
  actionRender: React.Component | ReactNode;
}

const DvImageForm: React.FC<DvImageFormProps> = (props) => {
  const { onChange, platformCtx, data, actionRender } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  return (
    <Form layout="vertical" className="dv-image-form" onValuesChange={onChange}>
      <div className="dv-image-form__sub-title">基础配置</div>
      <Form.Item name="title" label="组件名称">
        <Input />
      </Form.Item>
      <Form.Item name="url" label="图片素材">
        <platformCtx.ui.UploadTool
          onSelected={(selectResult) => {
            console.log(selectResult);
          }}
        />
      </Form.Item>
      {actionRender}
    </Form>
  );
};

export default DvImageForm;
