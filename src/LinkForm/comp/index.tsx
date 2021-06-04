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
    <div className="link-action-form">
      <Form form={form} onValuesChange={handleValues}>
        <Form.Item name="jumpMethod">
          <Radio.Group>
            <Radio.Button value={JumpMethod.H5}>跳转H5</Radio.Button>
            <Radio.Button value={JumpMethod.Mini}>跳转小程序</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item shouldUpdate>
          {({ getFieldValue }) => {
            const jumpMethod = getFieldValue(['jumpMethod']);
            return (
              <>
                {jumpMethod === JumpMethod.H5 && (
                  <Form.Item name="url">
                    <TextArea placeholder="请输入H5路径" />
                  </Form.Item>
                )}
                {jumpMethod === JumpMethod.Mini && (
                  <>
                    <Form.Item name="id">
                      <Input placeholder="请输入小程序id" />
                    </Form.Item>
                    <Form.Item name="url">
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
