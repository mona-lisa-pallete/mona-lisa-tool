import { Form, Input, Radio, Select } from "antd";
import React, { useState } from "react";

const { TextArea } = Input;

export enum PageType {
  InternalPage = "internalPage",
  H5 = "h5",
  Mini = "mini",
}
const navigateTypeFieldName = "navigateType";

const types = [
  // {
  //   name: "跳转页面",
  //   value: PageType.InternalPage,
  // },
  {
    name: "跳转H5",
    value: PageType.H5,
  },
  {
    name: "跳转小程序",
    value: PageType.Mini,
  },
];

interface ToastActionFormProps {
  value: any;
  onChange: (value: any) => void;
  pageData: Array<{ value: string; name: string }>;
}

const ToastActionForm: React.FC<ToastActionFormProps> = (props) => {
  const { value, onChange, pageData = [] } = props;
  const [form] = Form.useForm();
  const [type, setType] = useState<PageType>(
    value?.[`${navigateTypeFieldName}`]
  );
  return (
    <Form
      initialValues={value}
      form={form}
      onValuesChange={(_, values) => {
        onChange({
          ...values,
          type: values.type,
        });
      }}
    >
      <Form.Item name={`${navigateTypeFieldName}`}>
        <Radio.Group style={{ display: "flex" }}>
          {types.map((v) => (
            <Radio.Button
              key={v.value}
              onClick={() => setType(v.value)}
              style={{ fontSize: "13px", flex: 1, textAlign: "center" }}
              value={v.value}
            >
              {v.name}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      {/* {type === PageType.InternalPage && (
        <Form.Item name="url">
          <Select placeholder="请选择链接页面">
            {pageData.map((i) => {
              return <Select.Option value={i.value}>{i.name}</Select.Option>;
            })}
          </Select>
        </Form.Item>
      )} */}

      <Form.Item hidden={type !== PageType.H5} name="urlH5">
        <TextArea placeholder="请输入页面url: https://path" />
      </Form.Item>
      <>
      {/* 小程序 */}
      <Form.Item hidden={type !== PageType.Mini} name="urlMini">
        <TextArea placeholder="请输入URL: /pages/path" />
      </Form.Item>
      <Form.Item hidden={type !== PageType.Mini} name="appId">
        <Input placeholder="小程序ID，置空为跳转当前小程序" />
      </Form.Item>
      </>
    </Form>
  );
};
export default ToastActionForm;
