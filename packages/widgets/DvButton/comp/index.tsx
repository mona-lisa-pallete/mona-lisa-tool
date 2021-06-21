import { Image, View } from "@tarojs/components";
import React from "react";
import "./index.less";
import { dvPxTransform, trackLog, dvConnect } from "@davinci/core";

const DvButton = ({ onClick, children, url, edit, style, id }) => {
  if (edit && !url) {
    return (
      <View
        style={{
          width: "168px",
          height: "32px",
        }}
        className="dv-btn--no-data"
      >
        <Image
          style={{ userSelect: "none" }}
          src="https://static.guorou.net/course-static/e646099d42674c3ba56e5291247179af.png"
        ></Image>
      </View>
    );
  }

  function clickTrack() {
    trackLog({
      e_c: "page",
      e_a: "click",
      e_n: "button_component_click",
      other: {
        component_id: id,
        component_name: "",
      },
    });
  }
  console.log(style, "style");

  return (
    <Image
      id={id}
      style={{
        position: style?.position || "static",
        width: dvPxTransform(style?.width),
        left: dvPxTransform(style?.left),
        top: dvPxTransform(style?.top),
      }}
      className="dv-btn"
      onClick={() => {
        onClick && onClick();
        clickTrack();
      }}
      src={url}
      mode="widthFix"
    />
  );
};

export default DvButton;
