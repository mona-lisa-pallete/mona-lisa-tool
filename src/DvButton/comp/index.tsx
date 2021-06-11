import { Button, View, Image } from "@tarojs/components";
import React from "react";
import "./index.less";
import { pxTransform } from "@tarojs/taro";

const DvButton = ({ onClick, children, url, edit , style }) => {

  if (edit && !url) {
    return (<View className="dv-image--no-data">
      <Image style={{userSelect: 'none'}} src="https://static.guorou.net/course-static/0318311ec3d44a7f9f4433c54b94cc7f.png"></Image>
      <View>请上传按钮</View>
    </View>)
  }

  const isAdmin = () => {
    const host = window.location.host
    return ["localhost:9999", "portalhome.uae.shensz.local", "portal.guorou.net"].includes(host)
  }

  const transform = (size: number) => {
    if (isAdmin()) {
      return size + 'px'
    } else {
      return pxTransform(size, 750)
    }
  }

  console.log(style, 'style');
  
  return <Image style={{
    ...style,
    width: transform(style?.width),
    height: transform(style?.height),
    left: transform(style?.left),
    top: transform(style?.top)
  }} className="dv-btn" onClick={onClick} src={url} mode="widthFix" />;
};

export default DvButton;
