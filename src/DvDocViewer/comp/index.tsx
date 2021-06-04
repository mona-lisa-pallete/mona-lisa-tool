import React, { useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import { sendEvenLog } from "@davinci/core";
import axios from "axios";

import "./index.less";

// import { Document, Page } from "react-pdf";
export const baseDavinci = "https://static.guorou.net/davinci";
export const baseImage = `${baseDavinci}/assets/images`;

declare var aliyun: any;

const EntryIcon = `${baseImage}/entry.png`;
const BackIcon = `${baseImage}/return.png`;
const PdfIcon = `${baseImage}/pdf.png`;
const WordIcon = `${baseImage}/word.png`;
const ExcelIcon = `${baseImage}/excel.png`;
const PPTIcon = `${baseImage}/ppt.png`;
const DownloadIcon = `${baseImage}/download.png`;

const IconDict = {
  pdf: PdfIcon,
  doc: WordIcon,
  docx: WordIcon,
  xls: ExcelIcon,
  xlsx: ExcelIcon,
  ppt: PPTIcon,
  pptx: PPTIcon,
};

type docProps = {
  list: docItem[];
};

type docItem = {
  src: string;
  name: string;
};



const loadScript = (src: string, cb: Function) => {
  return new Promise((resolve: Function, reject) => {
    const _id = `__aliyun_web_office_sdk`;
    if (document.querySelector(_id)) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.id = _id;
      script.src = src;
      script.onload = () => {
        resolve();
        cb();
      };
      script.onerror = () => {
        reject(`【${src}】下载失败`);
      };
      document.head.appendChild(script);
    }
  });
};

// const mock=[
//   {
//     name: "四年级英语深度课程EXCEL",
//     src: `https://static.guorou.net/davinci/test_doc/wps.xls`,
//   },
//   {
//     name: "四年级英语深度课程PDF",
//     src: `https://static.guorou.net/davinci/test_doc/wps.pdf`,
//   },
//   {
//     name: "四年级英语深度课程PPT",
//     src: `https://static.guorou.net/davinci/test_doc/wps.ppt`,
//   },
//   {
//     name: "四年级英语深度课程WORD",
//     src: `https://static.guorou.net/davinci/test_doc/wps.doc`,
//   },
// ]
function DvDocViewer(props: docProps) {
  const { list, ...p } = props;

  const [previewData, setPreviewData] = useState({
    preSrc: "",
    preDocName: "",
    isPreview: false,
  });

  function clickTrack() {
    sendEvenLog({
      e_c: "activity",
      e_a: "click",
      e_n: "doc_view",
    });
  }
  
  useEffect(() => {
    loadScript(
      "//g.alicdn.com/IMM/office-js/1.1.9/aliyun-web-office-sdk.min.js",
      () => {
        console.log("done __aliyun_web_office_sdk");
      }
    );
  }, []);
  const { isPreview, preSrc, preDocName } = previewData;
  console.log('DvDocViewer======props', props)
  return (
    <View className="dv_doc_viewer" {...p}>
      {Array.isArray(list)  && list.map(({ src = "", name }) => (
        <View
          className="doc_item"
          key={src}
          onClick={async () => {
            const url = src.replace(
              "https://static.guorou.net",
              "oss://static-zy-com"
            );
            const { data } = await axios.get(
              "http://portalhome.uae.shensz.local/davinciapi/api/1/core/util/office/preview_url",
              {
                params: {
                  url,
                },
              }
            );
            let { code = -1, msg, data: res } = data;
            const { PreviewURL, AccessToken } = res;
            console.log(data, data.data);
            if (code === -1) {
              console.error(msg);
            }
            setPreviewData({
              preSrc: src,
              preDocName: name,
              isPreview: true,
            });
            let instance = aliyun.config({
              url: PreviewURL, //设置文档预览U  RL地址。
              mount: document.querySelector("#aliyun_preview_iframe"),
            });
            instance.setToken({
              token: AccessToken,
            });
          }}
        >
          <Image
            className="doc_icon"
            src={IconDict[(src.match(/.*\.(.*)$/) || ["", ""])[1]]}
          />
          <View className="doc_content">
            <View className="doc_title">{name}</View>
            <View className="doc_size">330M</View>
          </View>
          <Image className="entry_icon" src={EntryIcon} />
          <View className="divider_down" />
        </View>
      ))}
      {isPreview && (
        <View className="doc_preview_modal">
          <View className="doc_preview_header">
            <Image
              className="doc_back_icon"
              onClick={() => {
                setPreviewData({
                  isPreview: false,
                  preSrc: "",
                  preDocName: "",
                });
              }}
              src={BackIcon}
            />
            <View className="doc_preview_title">{preDocName}</View>
          </View>
          <div
            className="doc_iframe_container"
            id="aliyun_preview_iframe"
          ></div>
          <Image
            onClick={() => {
              window.location.href = preSrc;
              clickTrack();
            }}
            className="doc_download_icon"
            src={DownloadIcon}
          />
        </View>
      )}
    </View>
  );
}

export default DvDocViewer;
