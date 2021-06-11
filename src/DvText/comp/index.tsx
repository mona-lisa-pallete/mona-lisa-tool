import React from "react";
import { DvTextProps } from "./types";
import "./index.less";
import { Text, View } from "@tarojs/components";

const DvText: React.FC<DvTextProps> = (props) => {
  const { text, edit, fontSize = 12, color = '#000', font, style } = props;

  if (edit && !text) {
    return (<View className="dv-text" style={{fontSize: '15px'}}>
      <Text>请输入文字</Text>
    </View>)
  }

  return <View style={{
    ...style,
    fontSize: fontSize + 'px',
    color: color,
    fontStyle: font?.fontStyle || 'normal',
    letterSpacing: font?.letterSpacing + 'px' || 'normal',
    lineHeight: font?.lineHeight || 'normal',
    textAlign: font?.textAlign || 'left',
    fontWeight: font?.fontWeight || 'normal',
    textDecoration: font?.textDecoration || 'none'
  }} className="dv-text" >{text}</View>
};

export default DvText;
