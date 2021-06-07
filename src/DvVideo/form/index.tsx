import { Form, Input } from "antd";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import './index.less';
import { PlusOutlined } from '@ant-design/icons';

interface DvVideoFormProps {
  initialValues: any;
  onChange: (allValues: any) => void;
  platformCtx: any;
  type: "vertical" | "horizontal"; // 竖屏 | 横屏
}

const DvVideoForm: React.FC<DvVideoFormProps> = (props) => {
  const { onChange, initialValues, platformCtx, type = "horizontal" } = props;
  const [form] = Form.useForm();
  const UploadRef = useRef();
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);

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
  
  useEffect(() => {
    UploadRef.current?.setUrlVal(initialValues?.url);
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Form
      initialValues={initialValues}
      className='dv-form'
      onValuesChange={(_, values) => {
        onChange(values);
      }}
      form={form}
      layout="vertical"
    >
      <div className="dv-form-subtitle">基础配置</div>
      <Form.Item name="title" label="组件名称:">
        <Input />
      </Form.Item>
      <div>{loading && `上传中..  ${percent}`}</div>
      <Form.Item name="src" label="视频:">
        <platformCtx.ui.UploadTool
          uploadContent={uploadButton}
          ref={UploadRef}
          onSelected={(selectResult) => {
            onChange({
              src: selectResult.url,
            });
            setLoading(false);
          }}
        />
      </Form.Item>
      {type === "horizontal" && (
        <Form.Item name="poster" label="视频封面:">
          <platformCtx.ui.UploadTool
            uploadContent={uploadButtonImage}
            onSelected={(selectResult) => {
              onChange({
                poster: selectResult.url,
              });
            }}
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default DvVideoForm;
