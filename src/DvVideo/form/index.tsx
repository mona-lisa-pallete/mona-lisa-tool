import { Form, Input } from "antd";
import React, { useRef } from "react";
import "./index.less";
import { PlusOutlined } from "@ant-design/icons";
import UploadContent from "../../_components/UploadContent/index";

interface DvVideoFormProps {
  initialValues: any;
  onChange: (allValues: any) => void;
  platformCtx: any;
  type: "vertical" | "horizontal"; // 竖屏 | 横屏
}

const DvVideoForm: React.FC<DvVideoFormProps> = (props) => {
  const { onChange, initialValues, platformCtx, type = "horizontal" } = props;
  console.log("==DvVideoForm=====", props);
  const [form] = Form.useForm();
  const UploadRef = useRef();

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传视频</div>
    </div>
  );
  const uploadButtonImage = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  const list = initialValues?.src && [
    {
      uid: 0,
      name: "视频",
      status: "done",
      url: initialValues?.src,
    },
  ];

  const posterList = initialValues?.poster && [
    {
      uid: 0,
      name: "封面",
      status: "done",
      url: initialValues?.poster,
    },
  ];

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
        <Input defaultValue={initialValues?.title} />
      </Form.Item>
      <Form.Item name="src" label="视频:">
        <platformCtx.ui.UploadTool
          showUploadList
          onChangeFormatter={(e) => {
            console.log("==onChangeFormatter==", e);
            const { fileList } = e;

            return fileList[fileList.length - 1]?.url;
          }}
          defaultFileList={list}
          uploadContent={uploadButton}
        />
      </Form.Item>
      {type === "horizontal" && (
        <Form.Item name="poster" label="视频封面:">
          <platformCtx.ui.UploadTool
            showUploadList
            onChangeFormatter={(e) => {
              const { fileList } = e;
              return fileList[fileList.length - 1]?.url;
            }}
            UploadContent={uploadButtonImage}
            defaultFileList={posterList}
            ref={UploadRef}
            onSelected={(selectResult) => {
              UploadRef.current?.setUrlVal(selectResult.poster);
            }}
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default DvVideoForm;
