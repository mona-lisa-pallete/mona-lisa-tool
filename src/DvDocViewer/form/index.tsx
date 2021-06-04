import { Form, Input } from "antd";
import React, { ReactNode, useEffect, useRef } from "react";

interface DvDocViewerFormProps {
  initialValues: any;
  onChange: (allValues: any) => void;
  platformCtx: any;
}

const DvDocViewerForm: React.FC<DvDocViewerFormProps> = (props) => {
  const { onChange, initialValues } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if(form) {
      form.setFieldsValue(initialValues);
    }
  }, [form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={(e) => {
        if (onChange) {
          const withNameList = e.list.map((v) => ({
            src: v.src,
            name: v.src.match(/.*\/(.*?)$/)[1],
          }));
          onChange({ ...e, list: withNameList });
        }
      }}
    >
      <div>基础配置</div>
      <Form.Item name="title" label="文档名称">
        <Input />
      </Form.Item>
      <Form.Item name={["list", 0, "src"]} label="文件素材1">
        <Input />
      </Form.Item>
      <Form.Item name={["list", 1, "src"]} label="文件素材2">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default DvDocViewerForm;
