import { Form, Input } from "antd";
import React from "react";
import "./index.less";

interface DvDocViewerFormProps {
  initialValues: any;
  onChange: (allValues: any) => void;
  platformCtx: any;
  value: { list: Array<{ url: string; name: string }> };
}

const DvDocViewerForm: React.FC<DvDocViewerFormProps> = (props) => {
  const { onChange, initialValues, platformCtx } = props;
  const [form] = Form.useForm();

  return (
    <Form
      initialValues={initialValues}
      className="dv-form"
      form={form}
      layout="vertical"
      onValuesChange={(_, values) => {
        onChange(values);
      }}
    >
      <div className="dv-form-subtitle">基础配置</div>
      <Form.Item name="title" label="组件名称:">
        <Input />
      </Form.Item>

      <Form.Item name="list" label="文档上传:">
        <platformCtx.ui.Upload type="file" />
      </Form.Item>
    </Form>
  );
};

export default DvDocViewerForm;
