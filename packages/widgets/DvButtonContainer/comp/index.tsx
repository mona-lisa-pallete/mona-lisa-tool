import { dvPxTransform } from '@davinci/core';
import { Image, View } from "@tarojs/components";
import React from "react";
import "./index.less";

const DvButtonContainer = ({ onClick, children, url, edit , style, id }) => {

  if (edit && !url) {
    return (<View style={{
      height: '168px',
      width: '375px'
    }} className="dv-image--no-data">
      <Image className="dv-image__img" style={{ width: '96px', height: '49px' }} src="https://static.guorou.net/course-static/0ac63ea5e76548bc99f21916f3a143c2.png"></Image>
      <View>在右侧配置图片</View>
    </View>)
  }

  console.log(style, 'style');
  
  return <Image id={id} style={{
    position: style?.position || 'static',
    width: dvPxTransform(style?.width),
    left: dvPxTransform(style?.left),
    top: dvPxTransform(style?.top)
  }} className="dv-btn" onClick={onClick} src={url} mode="widthFix" />;
};

export default DvButtonContainer;
