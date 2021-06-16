import { dvPxTransform, trackLog, dvConnect } from '@davinci/core';
import { Image, View } from "@tarojs/components";
import React from "react";
import "./index.less";
import { DvImageProps } from "./types";

interface EventProps {
  pageId: string;
  pageName: string;
  id: string;
}

const DvImage: React.FC<DvImageProps & EventProps> = (props) => {
  const { url, onClick, edit, style, pageId, pageName, id } = props;
  const ref = React.createRef();

  if (edit && !url) {
    return (<View className="dv-image--no-data">
      <Image style={{userSelect: 'none'}} src="https://static.guorou.net/course-static/345f26dde8c94fefb9e2e4c5259083c9.png"></Image>
      <View>请上传图片</View>
    </View>)
  }
  
  function clickTrack() {
    trackLog({
      e_c: "page",
      e_a: "click",
      e_n: "picture_component_click",
      other: {
        page_id: "pageId",
        page_name: "pageName",
        component_id: id,
        component_name: ''
      }
    });
  }

  return <Image 
  style={{
    position: style?.position || 'static',
    width: dvPxTransform(style?.width),
    left: dvPxTransform(style?.left),
    top: dvPxTransform(style?.top)
  }} className="dv-image" onClick={()=>{
    onClick && onClick()
    clickTrack()
  }} ref={ref} src={url} mode="widthFix" />;
};

export default DvImage;
