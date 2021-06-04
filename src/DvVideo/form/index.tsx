import { Form, Input } from "antd";
import React, { ReactNode, useEffect, useRef } from "react";
import UploadTool from "@/_components/UploadTool/";

interface DvVideoFormProps {
  initialValues: any;
  onChange: (allValues: any) => void;
  platformCtx: any;
}

const DvVideoForm: React.FC<DvVideoFormProps> = (props) => {
  const { onChange, initialValues, platformCtx } = props;
  const [form] = Form.useForm();
  const UploadRef = useRef();

  useEffect(() => {
    UploadRef.current?.setUrlVal(initialValues?.url)
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Form form={form} layout="vertical" className="dv-image-form">
      <div className="dv-image-form__sub-title">基础配置</div>
      <Form.Item name="src" label="视频素材">
        <platformCtx.ui.UploadTool
          uploadContent='选择视频'
          ref={UploadRef}
          onSelected={(selectResult) => {
            onChange({
              src: selectResult.url
            })
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default DvVideoForm;
