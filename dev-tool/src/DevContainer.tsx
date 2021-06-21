import { Input, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { CodeEditor } from "./components/CodeEditor";
import { JSONDisplayer } from "./components/JsonDisplayer";
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
    Upload: ({ onSelected }) => (
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

const formStorage = {};
const useForm = (meta): [any, any] => {
  const initVal = formStorage[meta] || {};
  const [formState, setFormState] = useState(initVal);
  const setForm = (nextForm = {}) => {
    const nextVal = {
      ...formState,
      ...nextForm,
    };
    formStorage[meta] = nextVal;
    setFormState(nextVal);
  };
  useEffect(() => {
    setFormState(formStorage[meta] || {});
  }, [meta]);
  return [formState, setForm];
};

export const DevContainer = ({ selectedDevData }: any) => {
  const devMetaData = useSelectedDevData(selectedDevData);
  // @ts-ignore
  const Widget = LoadWidget(devMetaData?.elementRef);
  // @ts-ignore
  const WidgetForm = LoadWidget(devMetaData?.propFormConfig?.customFormRef);

  const [formState, setFormState] = useForm(selectedDevData);

  const editorRef = React.createRef<LowCodeEditor>();

  const [showPanel, setShowPanel] = useState(true);

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
      <div
        className="code-editor bg-white z-50"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: showPanel ? 380 : 40,
          overflow: "auto",
          boxShadow: `0 0 50px 0 rgb(0 0 0 / 8%)`,
        }}
      >
        <Tabs
          type="card"
          onChange={(activeKey) => {
            if (activeKey === "toggle-panel") {
              setShowPanel(!showPanel);
            } else {
              setShowPanel(true);
            }
          }}
        >
          <Tabs.TabPane
            tab="组件元数据"
            key="metadata"
            className="px-2"
            style={{
              height: 300,
              overflow: "auto",
            }}
          >
            <JSONDisplayer jsonData={devMetaData} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="表单数据"
            key="form-state"
            className="px-2"
            style={{
              height: 300,
              overflow: "auto",
            }}
          >
            <LowCodeEditor
              ref={editorRef}
              width={"calc(100vw - 200px)"}
              height="270px"
              language="json"
              onSubmit={(nextValue) => {
                // console.log(nextValue);
                if (nextValue.json) {
                  setFormState(nextValue.json);
                }
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="组件工程代码编"
            key="widget-code"
            className="px-2"
            style={{
              height: 300,
              overflow: "auto",
            }}
          >
            <CodeEditor text="1. TODO：组件工程代码编器 2. 组件工程管理" />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={showPanel ? "收起" : "展开"}
            key="toggle-panel"
            className="px-2"
          ></Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};
