import React from "react";
import { DvImageProps } from "./types";
import "./index.less";
import { Button, Image, View } from "@tarojs/components";
import { pxTransform } from "@tarojs/taro";

const DvImage: React.FC<DvImageProps> = (props) => {
  const { url, onClick, edit, style } = props;
  const ref = React.createRef();

  if (edit && !url) {
    return (<View className="dv-image--no-data">
      <Image style={{userSelect: 'none'}} src="https://static.guorou.net/course-static/345f26dde8c94fefb9e2e4c5259083c9.png"></Image>
      <View>请上传图片</View>
    </View>)
  }

  const isAdmin = () => {
    const host = window.location.host
    return ["localhost:9999", "portalhome.uae.shensz.local", "portal.guorou.net"].includes(host)
  }

  const transform = (size: number) => {
    // if (isAdmin()) {
      return size + 'px'
    // } else {
    //   return pxTransform(size, 750)
    // }
  }

  return <Image style={{
    position: style?.position || 'static',
    width: transform(style?.width),
    height: transform(style?.height),
    left: transform(style?.left),
    top: transform(style?.top)
  }} className="dv-image" onClick={onClick} ref={ref} src={url} mode="widthFix" />;
};

export default DvImage;
