import { Form, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

const {TextArea} = Input
interface LinkActionFormProps {
  value: any;
  onChange: (value: any) => void;
}

enum JumpMethod {
  H5 = 'h5',
  Mini = 'mini',
}

const LinkActionForm: React.FC<LinkActionFormProps> = (props) => {
  const { value, onChange } = props;
  const [form] = Form.useForm()


  useEffect(() => {
    if (value) {
        form.setFieldsValue(JSON.parse(JSON.stringify(value)));
    }
  }, [value]);

  const handleValues = (changedValues: any, values: any) => {
    if (values) {
      onChange && onChange(JSON.parse(JSON.stringify(values)))
    }
  };

  return (
    <div className="dv-form link-action-form">
      <Form form={form} onValuesChange={handleValues}>
        <Form.Item name="jumpMethod">
          <Radio.Group>
            <Radio.Button value={JumpMethod.H5}>跳转H5</Radio.Button>
            <Radio.Button value={JumpMethod.Mini}>跳转小程序</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item preserve={false} shouldUpdate={(prevValues, curValues) => {
          // if (prevValues?.jumpMethod !== curValues?.jumpMethod) {
          //   form.setFieldsValue({
          //     url: prevValues.url
          //   })
          // }
          return prevValues?.jumpMethod !== curValues?.jumpMethod
        }}>
          {({ getFieldValue }) => {
            const jumpMethod = getFieldValue(['jumpMethod']);
            return (
              <>
                {jumpMethod === JumpMethod.H5 && (
                  <Form.Item preserve={false} name="url">
                    <TextArea placeholder="请输入H5路径" />
                  </Form.Item>
                )}
                {jumpMethod === JumpMethod.Mini && (
                  <>
                    <Form.Item preserve={false} name="id">
                      <Input placeholder="请输入小程序id" />
                    </Form.Item>
                    <Form.Item preserve={false} name="url">
                      <Input placeholder="请输入小程序路径" />
                    </Form.Item>
                  </>
                )}
              </>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};
export default LinkActionForm;