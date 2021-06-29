import { Form, Input } from "antd";
import React, { ReactNode, useEffect } from "react";

import "./form.less";

interface AdmissionsFormForZhiweiFormProps {
  /** 由编辑器传入的 change 接口 */
  onChange: (changedValues: any) => void;
  /** 初始化的值，由编辑器传入 */
  initialValues: any;
  actionRender: React.Component | ReactNode;
  /** 编辑器的上下文 */
  platformCtx: {
    /** 平台传入的通用 UI 组件 */
    ui: {
      UploadTool: any;
      ColorPicker: any;
    };
  };
}

const AdmissionsFormForZhiweiForm: React.FC<AdmissionsFormForZhiweiFormProps> = (props) => {
  const { onChange, platformCtx, initialValues } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Form layout="vertical" className="" onValuesChange={onChange}>
      <div className="dv-form__sub-title">基础配置</div>
      <Form.Item name="title" label="组件名称">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default AdmissionsFormForZhiweiForm;
