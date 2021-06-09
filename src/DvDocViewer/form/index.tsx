import { Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
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
  const UploadRef = useRef();

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
        <Input defaultValue={initialValues.title} />
      </Form.Item>
      <Form.Item name="list" label="视频素材">
        <platformCtx.ui.UploadTool
          onChangeFormatter={(e) => {
            const { fileList } = e;
            return fileList.map((v) => ({ size: v.size, src: v.url, name: v.name }));
          }}
          defaultFileList={list}
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
