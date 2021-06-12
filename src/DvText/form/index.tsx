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
  const [style, setStyle] = useState({
    lineHeight: 0,
    letterSpacing: 0,
    fontWeightVal: false,
    fontStyleVal: false,
    textDecorationVal: false
  })

  const handleStyle = (css: React.CSSProperties) => {
    console.log(css);
  }

  useEffect(() => {
    if (!initialValues.fontSize) {
      initialValues.fontSize = 12
    }
    form.setFieldsValue(initialValues);
    if (initialValues?.style) {
      console.log(initialValues?.style, 'initialValues');
      // setStyle(initialValues.style)
    }
  }, [initialValues, form]);

  return (
    <div>
      <Form form={form} layout="vertical" className="dv-image-form" 
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
            <Form.Item name="color">
              <platformCtx.ui.ColorPicker />
            </Form.Item>
            <Form.Item name="fontSize">
              <Select options={fontSize}>
              </Select>
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item noStyle name="font">
          <StyleBtn onChangeStyle={handleStyle} textDecorationVal={style.textDecorationVal} fontWeightVal={style.fontWeightVal} fontStyleVal={style.fontStyleVal} letterSpacing={style.letterSpacing} lineHeight={style.lineHeight}></StyleBtn>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DvTextForm;
