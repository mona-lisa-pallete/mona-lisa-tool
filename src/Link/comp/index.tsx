import { Form, Input, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react'
import './index.less'

interface LinkActionFormProps {
  value: any;
  onChange: (value: any) => void
}

enum JumpMethod {
  H5 = 'h5',
  Mini = 'mini'
}

const LinkActionForm: React.FC<LinkActionFormProps> = (props) => {
  const { value, onChange } = props
  const [data, setData] = useState()
  
  useEffect(() => {
    console.log(value);
  },[value])

  const handleLinkType = (e) => {
    onChange({
      linkType: e.target.value
    })
    setLinkType(e.target.value)
  }

  const handleValues = () => {

  }

  return (
    <div className="link-action-form">
      <Form  onValuesChange={handleValues}>
        <Form.Item name="jumpMethod">
          <Radio.Group>
              {/* <Radio.Button>跳转页面</Radio.Button> */}
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
                          <Form.Item>
                          <div className="link-action-form-item">
                            <TextArea />
                          </div>
                        </Form.Item>
                        )}
                      {
                        jumpMethod === JumpMethod.Mini && (
                          <Form.Item>
                            <div className="link-action-form-item">
                              <Input />
                              <Input />
                            </div>
                          </Form.Item>
                        )
                      }
            </>
          )
         }}
        </Form.Item>
      </Form>
    </div>
  )
}
export default LinkActionForm;