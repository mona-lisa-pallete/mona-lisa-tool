import { dvPxTransform } from '@davinci/core';
import { Text, View } from "@tarojs/components";
import React from "react";
import "./index.less";
import { DvTextProps } from "./types";

const DvText: React.FC<DvTextProps> = (props) => {
  const { text, edit, fontSize = 12, color = '#000', font, style } = props;

  if (edit && !text) {
    return (<View className="dv-text" style={{fontSize: '15px'}}>
      <Text>请输入文字</Text>
    </View>)
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
  }} className="dv-text" >{text}</View>
};

export default DvText;
