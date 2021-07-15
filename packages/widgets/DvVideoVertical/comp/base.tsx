import React, { useRef, useState } from "react";
import { Video } from "@tarojs/components";
import "./index.less";
import { IS_H5, trackLog } from "@monalisa-lowcode/core";

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
function DvVideoVertical(props: {
  style: any;
  type: "horizontal" | "vertical";
  id: string;
  src: string;
}) {
  const { style, type = "horizontal", id, src } = props;
  const time = useRef(0);
  const playTimer = useRef<any>();

  const height = type === "horizontal" ? undefined : "100vh";
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
      className={type === "horizontal" ? "" : "dv_video_portrain"}
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
        trackLog({
          e_c: "page",
          e_a: "click",
          e_n: "click_play_video",
          other: {
            component_id: id,
            material_id: src,
          },
        });
        playTimer.current = setInterval(() => {
          trackLog({
            e_c: "page",
            e_a: "click",
            e_n: type === "horizontal" ? "watch_video" : "watch_video2",
            other: {
              component_id: id,
              material_id: src,
            },
          });
        }, 5000);
      }}
      onTimeUpdate={(e) => {
        time.current = e.detail.currentTime;
      }}
      onFullscreenChange={(e) => {
        trackLog({
          e_c: "page",
          e_a: "click",
          e_n: e.detail.fullScreen ? "click_full_screen" : "cancel_full_screen",
          other: {
            component_id: id,
            material_id: src,
          },
        });
      }}
      onPause={() => {
        if (playTimer.current) {
          clearInterval(playTimer.current);
        }
        trackLog({
          e_c: "page",
          e_a: "click",
          e_n: type === "horizontal" ? "click_stop_video" : "stop_play_video",
          other: {
            component_id: id,
            material_id: src,
            time: time.current,
          },
        });
      }}
      {...{
        ...props,
        style: formatStyle,
      }}
      id={id}
    ></Video>
  );
}

export default DvVideoVertical;
