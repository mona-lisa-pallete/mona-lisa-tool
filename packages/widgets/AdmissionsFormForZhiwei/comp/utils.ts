import { GRADES } from "./const";
import { Products, OfflineData } from "./types";
import qs from "querystring";

export function getGradeById(id: number) {
  for (let i = 0; i < GRADES.length; i++) {
    for (let j = 0; j < GRADES[i].subItem.length; j++) {
      if (GRADES[i].subItem[j].id === id) {
        return GRADES[i].subItem[j];
      }
    }
  }
}

export const getQuerysFromUrl = () => {
  const param = location.search ? location.search.substr(1) : "";
  return param ? qs.parse(param) : {};
};

/**
 * 取电商商品跟线下配置的交集，同时过滤无效科目&课程
 */
export const filterProducts: (
  products: Products,
  offlineData: OfflineData
) => Products = (products, offlineData) => {
  const subjectsCanbeChoice = offlineData.subjects;
  const timeSeqsCanbeChoice = offlineData.time_seqs;
  return products
    .map((item) => {
      const newProductList = [];
      let productOSS = true; // 默认没库存
      for (let i = 0; i < item.product_list.length; i++) {
        if (timeSeqsCanbeChoice.includes(item.product_list[i].time_seq)) {
          newProductList.push(item.product_list[i]);
          const sellInfo = item.product_list[i].sell_info;
          if (sellInfo.sell_limit > sellInfo.sold_num) {
            productOSS = false; // 有库存
          }
        }
      }
      // 如果课程列表过滤后为空，则过滤掉这个科目
      if (newProductList.length === 0) {
        return null;
      }
      // 如果线下没有选择该课程
      if (!subjectsCanbeChoice.includes(item.subject_id)) {
        return null;
      }

      return {
        ...item,
        product_list: newProductList,
        subjectLimited: productOSS,
      };
    })
    .filter((item) => !!item);
};

export const isNumber = (val: any) => typeof val === "number";

export const preventDefault = (e) => e.preventDefault();
export const stopPropagation = (e) => e.stopPropagation();
