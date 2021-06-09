import { Button, View, Image } from "@tarojs/components";
import React from "react";
import "./index.less";

const DvButton = ({ onClick, children, url, edit , style }) => {

  if (edit && !url) {
    return (<View className="dv-image--no-data">
      <Image style={{userSelect: 'none'}} src="https://static.guorou.net/course-static/0318311ec3d44a7f9f4433c54b94cc7f.png"></Image>
      <View>请上传按钮</View>
    </View>)
  }

  return <Image style={style} className="dv-image" onClick={onClick} src={url} mode="widthFix" />;
};

export default DvButton;
