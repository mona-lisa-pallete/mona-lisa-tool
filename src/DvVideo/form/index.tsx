import { Form } from "antd";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

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

  useEffect(() => {
    UploadRef.current?.setUrlVal(initialValues?.url);
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Form
      onValuesChange={(_, values) => {
        onChange(values);
      }}
      form={form}
      layout="vertical"
    >
      <div>{loading && `上传中..  ${percent}`}</div>
      <Form.Item name="src" label="视频素材">
        <platformCtx.ui.UploadTool
          onProgress={(e) => {
            setLoading(true);
            setPercent(`${e.percent}`.substring(0, 3).concat("%"));
          }}
          uploadContent="选择视频"
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
        <Form.Item name="poster" label="视频封面">
          <platformCtx.ui.UploadTool
            uploadContent="选择封面"
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
