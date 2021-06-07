import React from "react";
import { Video } from "@tarojs/components";
import './index.less';

// const mock = {
//   src: "https://static.guorou.net/grow/grow_mp/video.mp4",
//   style: {
//     height: "320px",
//     position: "relative",
//   },
// };
/**
 * @see https://developers.weixin.qq.com/miniprogram/dev/component/video.html
 */
function DvVideo(props: {style: any, type: 'horizontal'|'vertical'}) {
  const { style, type = 'horizontal' } = props;

  const height = type === 'horizontal' ? undefined: '100vh';
  const formatStyle =
    typeof style === "object"
      ? {
        height,
        ...style,
        position: "relative", // 覆盖默认传的 absolute 值
        }
      : style;
  return (
    <Video
      object-fit="contain"
      show-center-play-btn={false}
      // enable-progress-gesture={false}

      // src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      controls={true}
      autoplay={false}
      // poster="http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg"
      initialTime="0"
      loop={false}
      muted={false}
      onPlay={() => {

      }}
      {...{
        ...props,
        style: formatStyle,
      }}
    ></Video>
  );
}

export default DvVideo;
