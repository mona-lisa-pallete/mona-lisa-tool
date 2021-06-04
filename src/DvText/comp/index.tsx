import { Button, View } from "@tarojs/components";
import React from "react";
import "./index.less";

const DvText = ({ onClick, text = "文本", children }) => {
  return <View onClick={onClick}>{text}</View>;
};

export default DvText;
