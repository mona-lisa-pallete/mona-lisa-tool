import { dvPxTransform, sendEvenLog, dvConnect } from '@davinci/core';
import { Text, View } from "@tarojs/components";
import React from "react";
import "./index.less";
import { DvTextProps } from "./types";

interface EventProps {
  id: string;
}

const DvText: React.FC<DvTextProps & EventProps> = (props) => {
  const { text, edit, fontSize = 12, color = '#000', font, style, id,  onClick } = props;

  if (edit && !text) {
    return (<View className="dv-text" style={{fontSize: '15px'}}>
      <Text>请输入文字</Text>
    </View>)
  }

  function clickTrack() {
    sendEvenLog({
      e_c: "page",
      e_a: "click",
      e_n: "text_component_click",
      other: {
        page_id: "pageId",
        page_name: "pageName",
        component_id: id,
        component_name: ''
      }
    });
  }

  return <View style={{
    position: style?.position || 'static',
    fontSize: dvPxTransform(fontSize),
    left: dvPxTransform(style?.left),
    top: dvPxTransform(style?.top),
    color: color,
    fontStyle: font?.fontStyle || 'normal',
    letterSpacing: dvPxTransform(font?.letterSpacing) || 'normal',
    lineHeight: font?.lineHeight || 'normal',
    textAlign: font?.textAlign || 'left',
    fontWeight: font?.fontWeight || 'normal',
    textDecoration: font?.textDecoration || 'none'
  }} className="dv-text" onClick={()=>{
    onClick && onClick()
    clickTrack()
  }} >{text}</View>
};

export default DvText;
