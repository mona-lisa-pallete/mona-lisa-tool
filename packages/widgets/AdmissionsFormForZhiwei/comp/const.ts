import { getQuerysFromUrl } from "./utils";

const query = getQuerysFromUrl();
console.log("获取到的url参数", query);

// TODO: 这里需要确认
export const sellType = query.sell_type || "";
export const source = query.source || "";
export const source_hash = query.source_hash || "";
export const activity = query.activity || "";

// 生产
export const orderDetailUrl = "https://sell.guorou.net/m/order?order_id=";
// 预发
// export const orderDetailUrl = "http://sell.test.guorou.net/m/order?order_id="
// 开发
// export const orderDetailUrl = "http://sell.dev.guorou.net/m/order?order_id="

export const gradesMap = {
  "0A,0B": 0,
  "1A,1B": 1,
  "2A,2B": 2,
  "3A,3B": 3,
  "4A,4B": 4,
  "5A,5B": 5,
  "6A,6B": 6,
  "7A,7B": 7,
  "8A,8B": 8,
  "9A,9B": 9,
  "10A,10B": 10,
  "11A,11B": 11,
  "12A,12B": 12,
};

export const GRADE_NAMES = ["学前", "一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "初一", "初二", "初三", "高一", "高二"];

export const GRADES = [
  {
    subTitle: "小学阶段",
    subItem: [
      {
        id: 1,
        gradeName: "学前",
        gradeSubName: "升一年级",
      },
      {
        id: 2,
        gradeName: "一年级",
        gradeSubName: "升二年级",
      },
      {
        id: 3,
        gradeName: "二年级",
        gradeSubName: "升三年级",
      },
      {
        id: 4,
        gradeName: "三年级",
        gradeSubName: "升四年级",
      },
      {
        id: 5,
        gradeName: "四年级",
        gradeSubName: "升五年级",
      },
      {
        id: 6,
        gradeName: "五年级",
        gradeSubName: "升六年级",
      },
    ],
    canShow: (grades) => {
      for (let i = 1; i < 7; i++) {
        if (grades?.includes(i)) {
          return true;
        }
      }
      return false;
    },
  },
  {
    subTitle: "中学阶段",
    subItem: [
      {
        id: 7,
        gradeName: "六年级",
        gradeSubName: "升初一",
      },
      {
        id: 8,
        gradeName: "初一",
        gradeSubName: "升初二",
      },
      {
        id: 9,
        gradeName: "初二",
        gradeSubName: "升初三",
      },
    ],
    canShow: (grades) => {
      for (let i = 7; i < 10; i++) {
        if (grades?.includes(i)) {
          return true;
        }
      }
      return false;
    },
  },
  {
    subTitle: "高中阶段",
    subItem: [
      {
        id: 10,
        gradeName: "初三",
        gradeSubName: "升高一",
      },
      {
        id: 11,
        gradeName: "高一",
        gradeSubName: "升高二",
      },
    ],
    canShow: (grades) => {
      for (let i = 10; i < 12; i++) {
        if (grades?.includes(i)) {
          return true;
        }
      }
      return false;
    },
  },
];
