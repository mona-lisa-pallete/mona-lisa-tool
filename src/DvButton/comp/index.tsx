import { Image, View } from "@tarojs/components";
import React from "react";
import "./index.less";
import { dvPxTransform, trackLog, dvConnect } from '@davinci/core';

const DvButton = ({ onClick, children, url, edit , style, id }) => {

  if (edit && !url) {
    return (<View className="dv-image--no-data">
      <Image style={{userSelect: 'none'}} src="https://static.guorou.net/course-static/0318311ec3d44a7f9f4433c54b94cc7f.png"></Image>
      <View>请上传按钮</View>
    </View>)
  }


  function clickTrack() {
    trackLog({
      e_c: "page",
      e_a: "click",
      e_n: "button_component_click",
      other: {
        component_id: id,
        component_name: ''
      }
    });
  }
  console.log(style, 'style');
  
  return <Image style={{
    position: style?.position || 'static',
    width: dvPxTransform(style?.width),
    left: dvPxTransform(style?.left),
    top: dvPxTransform(style?.top)
  }} className="dv-btn" onClick={()=>{
    onClick && onClick()
    clickTrack()
  }} src={url} mode="widthFix" />;
};

export default DvButton;
