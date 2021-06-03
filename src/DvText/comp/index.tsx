import React from "react";
import { DvImageProps } from "./types";
import "./index.less";
import { Text, Image, View } from "@tarojs/components";

const DvText: React.FC<DvImageProps> = (props) => {
  const { url, onClick, edit } = props;
  const ref = React.createRef();

  if (edit && !url) {
    return (<View className="dv-text">
      <Text>请输入文字</Text>
    </View>)
  }
  console.log(Image);
  return <Image className="dv-image" onClick={onClick} ref={ref} src={url} mode="widthFix" />;
};

export default DvText;
