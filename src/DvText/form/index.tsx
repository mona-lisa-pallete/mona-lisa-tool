import { Form, Input, Select } from "antd";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import "./form.less";
import StyleBtn from './StyleBtn'

interface DvImageFormProps {
  initialValues: any;
  onChange: (allValues: any) => void;
  platformCtx: any;
}

const fontSize = new Array(40).fill(1).map((i, index)=> {
  return {
    label: index + 12 + 'px',
    value: index + 12
  }
})


const DvTextForm: React.FC<DvImageFormProps> = (props) => {
  const { onChange, initialValues, platformCtx } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (!initialValues.fontSize) {
      initialValues.fontSize = 12
    }
    form.setFieldsValue(initialValues);
  }, []);

  return (
    <div>
      <Form form={form} layout="vertical" initialValues={{
        font: {
          lineHeight: 1.5,
          letterSpacing: 0
        }
      }} className="dv-image-form" 
        onValuesChange={(_:any, allVal: any)=>{
          onChange(allVal)
        }}>
        <div className="dv-form dv-image-form__sub-title">基础配置</div>
        <Form.Item name="title" label="组件名称">
          <Input />
        </Form.Item>
        <Form.Item name="text" label="文案">
          <Input />
        </Form.Item>
        <Form.Item label="文字选项">
          <div className="inline-form-item">
            <Form.Item noStyle name="color">
              <platformCtx.ui.ColorPicker />
            </Form.Item>
            <Form.Item noStyle name="fontSize">
              <Select style={{
                width: "128px"
              }} options={fontSize}>
              </Select>
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item noStyle name="font">
          <StyleBtn></StyleBtn>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DvTextForm;
