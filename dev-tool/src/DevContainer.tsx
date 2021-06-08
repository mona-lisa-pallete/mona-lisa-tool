import React, { useState, useEffect } from "react";
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

/**
 * 平台提供给接入方的组件或者组件编辑表单的上下文，包含 UI、选择器
 */
const PlatformContext = {
  ui: {
    UploadTool: () => <div>上传组件，接入编辑器即可看到效果</div>,
    ColorPicker: () => <div>颜色选择器，接入编辑器即可看到效果</div>,
  },
};

export const DevContainer = ({ selectedDevData }: any) => {
  const devMetaData = useSelectedDevData(selectedDevData);
  // @ts-ignore
  const Widget = LoadWidget(devMetaData?.elementRef);
  // @ts-ignore
  const WidgetForm = LoadWidget(devMetaData?.propFormConfig?.customFormRef);

  const [formState, setFormState] = useState({});
  return (
    <div className="dev-container flex">
      <div className="widget-container flex-1">
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
        className="form p-4"
        style={{
          width: 256,
        }}
      >
        {WidgetForm && (
          <WidgetForm
            onChange={(nextVal) => {
              console.log(nextVal);
              setFormState(nextVal);
            }}
            initialValues={{}}
            platformCtx={PlatformContext}
          />
        )}
      </div>
    </div>
  );
};
