import React, { useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { sendEvenLog } from "@gr-davinci/core";

const IS_H5 = process.env.TARO_ENV === "h5";

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
  size: number;
};

async function downloadPDF({ url, name }) {
  if (!IS_H5) {
    Taro.showToast({
      title: "下载pdf只能在非小程序页面使用",
      icon: "none",
    });
    return;
  }
  const { data } = await Taro.request({
    method: "GET",
    url,
    responseType: "arraybuffer",
  });

  const blob = new Blob([data]);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  // 使用获取到的blob对象创建的url
  const urlObject = window.URL.createObjectURL(blob);
  a.href = urlObject;
  // 指定下载的文件名
  a.download = name;
  a.click();
  document.body.removeChild(a);
  // 移除blob对象的url
  window.URL.revokeObjectURL(urlObject);
}

function formatKB(kb: number, decimals = 2) {
  if (kb === 0) return "0";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "K", "M", "G"];

  const i = Math.floor(Math.log(kb) / Math.log(k));

  return parseFloat((kb / Math.pow(k, i)).toFixed(dm)) + sizes[i];
}

const loadScript = (src: string, cb: Function) => {
  if (!IS_H5) {
    return;
  }
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
      other: {
        key: "value_bar", // 打点table
      },
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
  const { debug = "" } = Taro.useRouter()?.params || {};

  const { isPreview, preSrc, preDocName } = previewData;
  return (
    <View className="dv_doc_viewer" {...p}>
      {Array.isArray(list) &&
        list.map(({ src = "", name = "-", size = 0 }, index) => (
          <View
            className="doc_item"
            key={index}
            onClick={async () => {
              const url = src.replace(
                "https://static.guorou.net",
                "oss://static-zy-com"
              );
              const { data } = await Taro.request({
                method: "GET",
                url: "https://portal.guorou.net/davinciapi/api/1/core/util/office/preview_url",
                data: {
                  url,
                },
              });

              let { code = -1, msg, data: res } = data;
              const { PreviewURL, AccessToken } = res;
              console.log(data, data.data);
              if (code === -1) {
                console.error(msg);
              }
              if (!IS_H5) {
                Taro.navigateTo({
                  url: `/pages/office/index?imm_url=${encodeURIComponent(
                    PreviewURL
                  )}&imm_token=${encodeURIComponent(
                    AccessToken
                  )}&title=${name}&file_url=${encodeURIComponent(
                    src
                  )}&debug=${debug}`,
                });
                return;
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
              <View className="doc_title one-line">{name}</View>
              <View className="doc_size">{formatKB(size)}</View>
            </View>
            <Image className="entry_icon" src={EntryIcon} />
            <View className="divider_down" />
          </View>
        ))}
      {IS_H5 && isPreview && (
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
            <View className="doc_preview_title one-line">{preDocName}</View>
          </View>
          <div
            className="doc_iframe_container"
            id="aliyun_preview_iframe"
          ></div>
          <Image
            onClick={() => {
              if (!IS_H5) {
                Taro.showToast({
                  title: "下载文件只能在非小程序页面使用",
                  icon: "none",
                });
                return;
              }
              if (/\.pdf$/.test(preSrc)) {
                downloadPDF({ url: preSrc, name: preDocName });
              } else {
                window.location.href = preSrc;
              }
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
