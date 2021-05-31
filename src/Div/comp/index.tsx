import React from "react";
import { View } from "@tarojs/components";

const index = (props) => {
  const { children, ...p } = props || {};

  return <View {...p}>{children}</View>;
};

export default index;
