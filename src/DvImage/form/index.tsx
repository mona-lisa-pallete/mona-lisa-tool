import { Form, Input } from "antd";
import React, { ReactNode, useEffect, useRef } from "react";
import "./form.less";
import UploadTool from "@/_components/UploadTool/";

interface DvImageFormProps {
  initialValues: any;
  onChange: (allValues: any) => void;
  platformCtx: any;
}

const DvImageForm: React.FC<DvImageFormProps> = (props) => {
  const { onChange, initialValues, platformCtx } = props;
  const [form] = Form.useForm();
  const UploadRef = useRef();

  useEffect(() => {
    UploadRef.current?.setUrlVal(initialValues?.url)
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Form form={form} layout="vertical" className="dv-image-form" onValuesChange={onChange}>
      <div className="dv-image-form__sub-title">基础配置</div>
      <Form.Item name="title" label="组件名称">
        <Input />
      </Form.Item>
      <Form.Item name="url" label="图片素材">
        <platformCtx.ui.UploadTool
          ref={UploadRef}
          onProgress={(list)=>{
            // console.log(list);
          }}
          onSelected={(selectResult) => {
            form.setFieldsValue({
              url: selectResult.url
            })
            onChange({
              url: selectResult.url
            })
            console.log(selectResult);
          }}
          onSelectedMaterial={(selectResult)=>{
            form.setFieldsValue({
              url: selectResult.url
            })
            onChange({
              url: selectResult.url
            })
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default DvImageForm;
