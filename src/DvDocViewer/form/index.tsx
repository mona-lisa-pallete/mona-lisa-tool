import { Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useRef, useEffect } from "react";
import "./index.less";
interface DvDocViewerFormProps {
  id: string;
  initialValues: any;
  onChange: (allValues: any) => void;
  platformCtx: any;
  value: { list: Array<{ url: string; name: string }> };
}

const DvDocViewerForm: React.FC<DvDocViewerFormProps> = (props) => {
  const { onChange, initialValues, platformCtx, id } = props;
  const [form] = Form.useForm();
  const UploadRef = useRef();
  useEffect(() => {
    if (form) {
      form.resetFields();
      setTimeout(() => {
        form.setFieldsValue(initialValues);
      }, 100);
    }
  }, [id, form]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传文件</div>
    </div>
  );
  const list = initialValues?.list?.map((v, i) => ({
    uid: i,
    name: v.name,
    status: "done",
    url: v.src,
  }));

  return (
    <Form
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
      <Form.Item
        getValueFromEvent={(fileList) => {
          return fileList.map((v) => ({
            size: v.size,
            src: v.url,
            name: v.name,
          }));
        }}
        valuePropName="fileList"
        name="list"
        label="文档上传:"
      >
        <platformCtx.ui.UploadTool
          materialType="file"
          accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
          showUploadList={true}
          multiple
          uploadContent={uploadButton}
          ref={UploadRef}
        />
      </Form.Item>
    </Form>
  );
};

export default DvDocViewerForm;
