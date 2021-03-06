import { Button, View } from "@tarojs/components";
import React from "react";
import "./index.less";

const DvButton = ({ onClick, children }) => {
  return <View onClick={onClick}></View>;
};

export default DvButton;
