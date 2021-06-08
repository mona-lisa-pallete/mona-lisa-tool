import { Input } from "antd";
import React, { useState, useEffect } from "react";
import { LowCodeEditor } from "./components/LowCodeEditor";
import { LoadScript } from "./load-stuff";
import { getJSON } from "./utils";

const useSelectedDevData = (selectedDevData: string): null | any[] => {
  const [devMetaData, setDevData] = useState<any>(null);
  useEffect(() => {
    getJSON(selectedDevData).then((metadata: any) => {
      Promise.all([
        LoadScript({
          src: `http://localhost:22111/${metadata.elementRef}.js`,
          id: metadata.elementRef,
        }),
        LoadScript({
          src: `http://localhost:22111/${metadata.propFormConfig.customFormRef}.js`,
          id: metadata.propFormConfig.customFormRef,
        }),
      ])
        .then()
        .finally(() => {
          console.log(metadata);
          setDevData(metadata);
        });
    });
  }, [selectedDevData]);
  return devMetaData;
};

const LoadWidget = (widgetRef: any) => {
  // @ts-ignore
  return window?.[widgetRef]?.default;
};

// 测试用的图片 https://lh3.googleusercontent.com/proxy/6x6VaeKWC84BOnCWgrwuvh8RCauK5WLg2vxICccXCPXjXKOTu50DH020-utBt5Rp-IfyaDFxvbVq9hSrQTA_E4ycVJ7fOYGemNygy3emC6G6WU3fgSYinZU

/**
 * 平台提供给接入方的组件或者组件编辑表单的上下文，包含 UI、选择器
 */
const PlatformContext = {
  ui: {
    UploadTool: ({ onSelected }) => (
      <div>
        输入 url 地址调试
        <Input
          onChange={(e) => {
            const value = e.target.value;
            onSelected({
              src: value,
              url: value,
            });
          }}
        />
      </div>
    ),
    ColorPicker: ({ onChange }) => (
      <div>
        输入 RGB 数值调试
        <Input
          onChange={(e) => {
            const value = e.target.value;
            onChange(value);
          }}
        />
      </div>
    ),
  },
};

const useForm = (initVal = {}): [any, any] => {
  const [formState, setFormState] = useState(initVal);
  const setForm = (nextForm = {}) => {
    setFormState({
      ...formState,
      ...nextForm,
    });
  };
  return [formState, setForm];
};

export const DevContainer = ({ selectedDevData }: any) => {
  const devMetaData = useSelectedDevData(selectedDevData);
  // @ts-ignore
  const Widget = LoadWidget(devMetaData?.elementRef);
  // @ts-ignore
  const WidgetForm = LoadWidget(devMetaData?.propFormConfig?.customFormRef);

  const [formState, setFormState] = useForm({});

  const editorRef = React.createRef<LowCodeEditor>();

  useEffect(() => {
    editorRef?.current?.onChange(JSON.stringify(formState));
  }, [formState]);

  return (
    <div className="dev-container">
      <div className="flex">
        <div className="widget-container flex-1 mt-4">
          <div className="flex justify-center">
            <div
              className="bg-white relative"
              style={{
                width: `375px`,
                height: `627px`,
              }}
            >
              {Widget && <Widget {...(formState || {})} />}
            </div>
          </div>
        </div>
        <div
          className="form p-4 bg-white shadow-sm"
          style={{
            width: 256,
          }}
        >
          {WidgetForm && (
            <WidgetForm
              onChange={(nextVal) => {
                setFormState(nextVal);
              }}
              initialValues={formState}
              platformCtx={PlatformContext}
            />
          )}
        </div>
      </div>
      <div className="code-editor">
        <h4>DSL 代码片段</h4>
        <LowCodeEditor
          ref={editorRef}
          width={"800px"}
          language="json"
          onSubmit={(nextValue) => {
            // console.log(nextValue);
            if (nextValue.json) {
              setFormState(nextValue.json);
            }
          }}
        />
      </div>
    </div>
  );
};
