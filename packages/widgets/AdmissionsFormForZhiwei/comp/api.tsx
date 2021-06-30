import { request } from '@tarojs/taro';
import { sellType, source, source_hash } from './const';
import { ICreateAddressData, IOfflineData, IPostOfflineData } from './types';

// export const orderDetailUrl = "https://sell.guorou.net/m/order?order_id=";
// 预发
// export const orderDetailUrl = "http://sell.test.guorou.net/m/order?order_id="
// 开发
// export const orderDetailUrl = "http://sell.dev.guorou.net/m/order?order_id="

const hosts = {
  /* 生产环境域名 */
  "portal.guorou.net": {
    "offline": "http://sale.guorou.net",
    "school_api": "http://schoolapi.vpcalh.uae.shensz.cn",
    "sell_api": "https://sell.guorou.net",
    "order_detail": "https://sell.guorou.net/m/order?order_id=",
  },
  "pre": {
    /* 预发 */
    "offline": "http://sale.test.guorou.net",
    "school_api": "http://schoolapi.vpctest.uae.shensz.cn",
    "sell_api": "http://sellapi.test.guorou.net", // TODO 确认一下这个域名
    "order_detail": "http://sell.test.guorou.net/m/order?order_id=",
  },
  /* 开发环境域名 */
  "dev": {
    "offline": "http://saleapi.uae.shensz.local", // 线下
    "school_api": "http://schoolapi.uae.shensz.local",
    "sell_api": "http://sell.dev.guorou.net", // TODO 确认一下这个域名
    "order_detail": "http://sell.dev.guorou.net/m/order?order_id=",
  },
  "mock": {
    "offline": "http://mock.guorou.local/mock/242",
    "school_api": "http://mock.guorou.local/mock/234",
    "sell_api": "http://mock.guorou.local/mock/11",
  }
};

export const currentApiHost = hosts[window.location.host] || hosts.pre;

// export const GRADE = [ '一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二',];



/** 获取线下设置配置 */
export async function getOfflineData(): Promise<IOfflineData> {
  const res = await request({
    method: 'GET',
    url: `${currentApiHost.offline}/sale/api/1/toker/source_info`,
    data: {
      source_hash,
    }
  });
  console.log('请求回来的数据', res);
  if (res.data?.data && res.data.code === 0) {
    return res.data.data as IOfflineData;
  } else {
    throw new Error('获取配置信息失败');
  }
}




/** 将数据提交给线下 */
export async function postToOffline(data: IPostOfflineData): Promise<any> {
  const res = await request({
    method: 'POST',
    url: `${currentApiHost.offline}/sale/api/2/toker/form_submit`,
    data,
  });
  console.log('post回来的数据', res, data);
  return res;
}

/** 将用户跟学校绑定 */
export async function bindUserSchool(studentId: string, schoolId: string): Promise<any> {
  const res = await request({
    method: 'POST',
    url: `${currentApiHost.school_api}/schoolapi/schoolapi/user/v1/update-user-school`,
    data: {
      inputer: {
        inputForm: 1,
        inputId: studentId
      },
      schoolId: {
        schoolId
      },
      studentId
    }
  });
  if (res.data?.code === 0) {
    return true;
  } else {
    throw new Error(res.data.message || '学生与学校关联失败');
  }
}

/* 从电商获取详细课程信息 */
export async function getDetailData(grade: number): Promise<any> {
  const res = await request({
    method: 'GET',
    url: `${currentApiHost.sell_api}/sellapi/2/mall/get_sell_page`,
    data: {
      sell_type: sellType,
      grade,
      need_default_grade: 0
    }
  });
  if (res.data?.code === 0 && res.data?.data?.products) {
    return res.data.data.products;
  } else {
    throw new Error('获取电商详情失败');
  }
}

/* 校验用户是否180内曾购课 */
export async function checkUserQualification() {
  const res = await request({
    method: 'POST',
    url: `${currentApiHost.sell_api}/sellapi/1/mall/check_user_qualification`,
    data: {
      sell_type: sellType,
      source,
    }
  });
  if (res.data.check_status !== 1) {
    throw new Error(res.data.check_arr?.description || res.data.check_description);
  }
  return true;
}



/* 创建订单地址 */
export async function createAddress(data: ICreateAddressData) {
  const res = await request({
    method: 'POST',
    url: `${currentApiHost.sell_api}/sellapi/1/pay/create_order_address`,
    data: {
      ...data,
      /* 是否默认 */
      is_default: 0,
    }
  });
  console.log('创建地址', res);
  // TODO: 对接地址
  return res.data?.data?.id as string;
}

/* 创建订单接口 */
export async function createOrder(skuId: number, addressId: string): Promise<{
  code: number;
  data: { order_id: number };
}> {
  const res = await request({
    method: 'POST',
    url: `${currentApiHost.sell_api}/sellapi/1/pay/create_order`,
    data: {
      /* 商品ids */
      sku_ids: skuId,
      /* 地址ids */
      order_address_id: addressId,
      /* 来源 */
      source,
      /* 来源哈希(2021-06-18添加 ) */
      source_hash: source_hash,
    }
  });
  if (res && res.data.code === 0 || res.data.code === 3117) {
    return res.data;
  } else {
    throw new Error(res.data.msg || '创建订单失败，请重试');
  }
}

export default {
  getOfflineData,
  postToOffline,
  bindUserSchool,
  getDetailData,
  checkUserQualification,
  createAddress,
  createOrder,
};
