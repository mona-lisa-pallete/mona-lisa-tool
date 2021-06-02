import { Button, View } from "@tarojs/components";
import React from "react";
import "./index.less";

const DvButton = ({ onClick, text = "按钮", children }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default DvButton;
