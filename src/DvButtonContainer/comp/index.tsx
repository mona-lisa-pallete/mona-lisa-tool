import { dvPxTransform } from '@davinci/core';
import { Image, View } from "@tarojs/components";
import React from "react";
import "./index.less";

const DvButtonContainer = ({ onClick, children, url, edit , style }) => {

  if (edit && !url) {
    return (<View className="dv-image--no-data">
      <Image style={{userSelect: 'none'}} src="https://static.guorou.net/course-static/0318311ec3d44a7f9f4433c54b94cc7f.png"></Image>
      <View>请上传按钮</View>
    </View>)
  }

  console.log(style, 'style');
  
  return <Image style={{
    position: style?.position || 'static',
    width: dvPxTransform(style?.width),
    left: dvPxTransform(style?.left),
    top: dvPxTransform(style?.top)
  }} className="dv-btn" onClick={onClick} src={url} mode="widthFix" />;
};

export default DvButtonContainer;
