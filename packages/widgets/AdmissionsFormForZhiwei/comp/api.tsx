import { request } from '@tarojs/taro';
import { sellType, source, source_hash, activity } from './const';
import { ICreateAddressData, IOfflineData, IPostOfflineData } from './types';

// export const orderDetailUrl = "https://sell.guorou.net/m/order?order_id=";
// 预发
// export const orderDetailUrl = "http://sell.test.guorou.net/m/order?order_id="
// 开发
// export const orderDetailUrl = "http://sell.dev.guorou.net/m/order?order_id="

const hosts = {
  /* 生产环境域名 */
  "sell.guorou.net": {
    "offline": "https://sale.guorou.net",
    "school_api": "https://sellapi.guorou.net",
    "sell_api": "https://sellapi.guorou.net",
    "order_detail": "https://sell.guorou.net/m/order?order_id=",
    "dv_api": "https://portal.guorou.net/davinciapi/api/1",
  },
  "pre": {
    /* 预发 */
    "offline": "http://sale.test.guorou.net",
    "school_api": "http://schoolapi.vpctest.uae.shensz.cn",
    "sell_api": "http://sellapi.test.guorou.net",
    "order_detail": "http://sell.test.guorou.net/m/order?order_id=",
    "dv_api": "http://portalhome.uae.shensz.local/davinciapi/api/1",
  },
  /* 开发环境域名 */
  "dev": {
    "offline": "http://saleapi.uae.shensz.local", // 线下
    "school_api": "http://sell.dev.guorou.net",
    "sell_api": "http://sell.dev.guorou.net",
    "order_detail": "http://sell.dev.guorou.net/m/order?order_id=",
    "dv_api": "http://portalhome.uae.shensz.local/davinciapi/api/1",
  },
  "mock": {
    "offline": "http://mock.guorou.local/mock/242",
    "school_api": "http://mock.guorou.local/mock/234",
    "sell_api": "http://mock.guorou.local/mock/11",
    "dv_api": "http://portalhome.uae.shensz.local/davinciapi/api/1",
  }
};

export const currentApiHost = hosts[window.location.host] || hosts.pre;

/** 获取线下设置配置 */
export async function getOfflineData(): Promise<IOfflineData> {
  const res = await request({
    method: 'GET',
    url: `${currentApiHost.offline}/sale/api/1/toker/source_info`,
    data: {
      source_hash,
    }
  });
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
  return res;
}

/** 将用户跟学校绑定 */
export async function bindUserSchool(studentId: string, schoolId: string): Promise<any> {
  const res = await request({
    method: 'POST',
    url: `${currentApiHost.sell_api}/sellapi/1/school_api/update_user_school`,
    credentials: 'include',
    data: {
      school_id: schoolId
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
    url: `${currentApiHost.sell_api}/sellapi/1/mall/check_days_not_paid`,
    credentials: 'include',
    data: {
      sell_type: sellType,
      source,
      days: 180
    }
  });
  console.log('res.data.data=', res.data.data);
  if (res.data.data !== true) {
    throw new Error(res.data);
  }
  return true;
}



/* 创建订单地址 */
export async function createAddress(data: ICreateAddressData) {
  const res = await request({
    method: 'POST',
    url: `${currentApiHost.sell_api}/sellapi/1/pay/create_order_address`,
    credentials: 'include',
    data: {
      ...data,
      /* 是否默认 */
      is_default: 0,
    }
  });
  return res.data?.data?.order_address_id as string;
}

/* 创建订单接口 */
export async function createOrder(skuId: number, addressId: string): Promise<{
  code: number;
  data: { order: { order_id: number } };
}> {
  const res = await request({
    method: 'POST',
    url: `${currentApiHost.sell_api}/sellapi/1/pay/create_order`,
    credentials: 'include',
    data: {
      /* 商品ids */
      sku_ids: '' + skuId,
      /* 地址ids */
      order_address_id: addressId,
      /* 来源 */
      source,
      sell_type: sellType,
      activity,
      /* 来源哈希(2021-06-18添加 ) */
      source_hash: source_hash,
    }
  });
  console.log('创建订单', res);
  if (res && res.data.code === 0 || res.data.code === 3117) {
    return res.data;
  } else {
    throw new Error(res.data.msg || '创建订单失败，请重试');
  }
}

export async function postDataToDv(data: Object) {
  await request({
    method: 'POST',
    url: `${currentApiHost.dv_api}/core/log`,
    data,
  });
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
