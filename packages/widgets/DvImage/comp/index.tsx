import {
  dvPxTransform,
  trackLog,
  dvConnect,
  getPageData,
} from "@monalisa-lowcode/core";
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
  const { url, onClick, edit, style, id } = props;
  const ref = React.createRef();

  if (edit && !url) {
    return (
      <View
        style={{
          height: "168px",
          width: "375px",
        }}
        className="dv-image--no-data"
      >
        <Image
          className="dv-image__img"
          style={{ width: "96px", height: "49px" }}
          src="https://static.guorou.net/course-static/0ac63ea5e76548bc99f21916f3a143c2.png"
        ></Image>
        <View>在右侧配置图片</View>
      </View>
    );
  }

  function clickTrack() {
    trackLog({
      e_c: "page",
      e_a: "click",
      e_n: "picture_component_click",
      other: {
        component_id: id,
        component_name: "",
      },
    });
  }

  return (
    <Image
      id={id}
      style={{
        position: style?.position || "static",
        width: dvPxTransform(style?.width),
        left: dvPxTransform(style?.left),
        top: dvPxTransform(style?.top),
        height: dvPxTransform(style?.height),
      }}
      className="dv-image"
      onClick={() => {
        onClick && onClick();
        clickTrack();
      }}
      ref={ref}
      src={url}
      mode="widthFix"
    />
  );
};

export default DvImage;
