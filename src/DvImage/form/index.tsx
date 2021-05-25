import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { ReactNode, useEffect } from 'react';
import './form.less';
import UploadTool from '@/_components/UploadTool/';

interface DvImageFormProps {
  data: any;
  onChange: (changedValues: any, allValues: any) => void;
  actionRender: React.Component | ReactNode;
}

const DvImageForm: React.FC<DvImageFormProps> = (props) => {
  const { onChange, data, actionRender } = props;
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  return (
    <Form  className="dv-image-form">
      <div className="dv-image-form__sub-title">基础配置</div>
      <Form.Item name="title" label="组件名称">
        <Input />
      </Form.Item>
      <Form.Item name="url" label="图片素材">
        <UploadTool />
      </Form.Item>
      {actionRender}
    </Form>
  );
};

export default DvImageForm;
