import React from "react";
import { DvImageProps } from "./types";
import "./index.less";
import { Button, Image, View } from "@tarojs/components";

const DvImage: React.FC<DvImageProps> = (props) => {
  const { url } = props;
  const ref = React.createRef();
  // return(
  //     <span>2222</span>
  // )
  console.log(Image);
  return <Image className="dv-image" ref={ref} src={url} mode="widthFix" />;
};

export default DvImage;
