import { Form, Input } from "antd";
import React, { useEffect, useRef } from "react";
import "./index.less";

interface DvVideoFormProps {
  initialValues: any;
  onChange: (allValues: any) => void;
  platformCtx: any;
  type: "vertical" | "horizontal"; // 竖屏 | 横屏
}

const DvVideoForm: React.FC<DvVideoFormProps> = (props) => {
  const { onChange, initialValues, platformCtx, type = "horizontal" } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, []);
  return (
    <Form
      className="dv-form"
      onValuesChange={(_, values) => {
        onChange(values);
      }}
      form={form}
      layout="vertical"
    >
      <div className="dv-form dv-form-subtitle">基础配置</div>
      <Form.Item name="title" label="组件名称:">
        <Input />
      </Form.Item>
      <Form.Item name="src" label="视频:">
        <platformCtx.ui.Upload name='src' type="video" />
      </Form.Item>
      {type === "horizontal" && (
        <Form.Item name="poster" label="视频封面:">
          <platformCtx.ui.Upload name='poster' />
        </Form.Item>
      )}
    </Form>
  );
};

export default DvVideoForm;
