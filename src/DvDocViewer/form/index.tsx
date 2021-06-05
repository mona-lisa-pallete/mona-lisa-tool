import { Form } from "antd";
import React, { useState, useEffect, useRef } from "react";

interface DvDocViewerFormProps {
  initialValues: any;
  onChange: (allValues: any) => void;
  platformCtx: any;
}

const DvDocViewerForm: React.FC<DvDocViewerFormProps> = (props) => {
  const { onChange, initialValues, platformCtx } = props;
  const [form] = Form.useForm();
  const UploadRef = useRef();
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    UploadRef.current?.setUrlVal(initialValues?.url);
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Form form={form} layout="vertical" className="dv-image-form">
      <div>{loading && `上传中..  ${percent}`}</div>

      <Form.Item name="list" label="视频素材">
        <platformCtx.ui.UploadTool
          multiple
          uploadContent="选择文档(可多选)"
          ref={UploadRef}
          onProgress={(e) => {
            setLoading(true);
            setPercent(
              e
                .map((v) => `${v.percent}`.substring(0, 3).concat("%"))
                .join("，")
            );
          }}
          onSelected={(values, ...args) => {
            onChange({
              list: values.map((v) => ({
                src: v.url,
                name: v.name,
              })),
            });
            setLoading(false);
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default DvDocViewerForm;
