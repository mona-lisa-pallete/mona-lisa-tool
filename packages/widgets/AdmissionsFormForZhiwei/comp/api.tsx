import { request } from '@tarojs/taro';
import { sellType, source, source_hash } from './const';
import { ICreateAddressData, IOfflineData, IPostOfflineData } from './types';

const apiHosts = {
  /* 生产环境域名 */
  "portal.guorou.net": {
    "post_offline_data": "http://saleapi.vpcalh.uae.shensz.cn",
    "school_api": "http://schoolapi.vpcalh.uae.shensz.cn",
    "sell_api": "http://sellapi.dev.guorou.net",
  },
  /* 开发环境域名 */
  "dev": {
    "post_offline_data": "http://saleapi.uae.shensz.local",
    "school_api": "http://schoolapi.uae.shensz.local",
    "sell_api": "http://mock.guorou.local", // 需要确定一下这个接口
  },
  "mock": {
    "get_offline_data": "http://mock.guorou.local",
    "post_offline_data": "http://saleapi.uae.shensz.local",
    "school_api": "http://mock.guorou.local/mock/234",
    "sell_api": "http://mock.guorou.local/mock/11",
  }
};

const currentApiHost = apiHosts[window.location.host] || apiHosts.mock;

export const GRADE = [ '一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二',];



/** 获取线下设置配置 */
export async function getOfflineData(): Promise<IOfflineData> {
  const data = await request({
    method: 'GET',
    url: 'http://mock.guorou.local/mock/242/getData',
    data: {
      source_hash,
    }
  });
  console.log('请求回来的数据', data);
  return data.data as IOfflineData;
}




/** 将数据提交给线下 */
export async function postToOffline(data: IPostOfflineData): Promise<any> {
  const res = await request({
    method: 'POST',
    url: `${currentApiHost.post_offline_data}/sale/api/2/toker/form_submit`,
    data,
  });
  console.log('post回来的数据', data);
  return data;
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
  })
}

/* 从电商获取详细课程信息 */
export async function getDetailData(grade: number): Promise<any> {
  const res = await request({
    method: 'GET',
    // url: `${currentApiHost.sell_api}/sellapi/2/mall/get_sell_page`,
    url: 'http://mock.guorou.local/mock/242/sellapi/2/mall/get_sell_page',
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
    method: 'GET',
    url: `${currentApiHost.sell_api}/api/1/pay/update_order_address`,
    data: {
      ...data,
      /* 是否默认 */
      is_default: 0,
    }
  });
  console.log('创建地址', res);
  return res;
}

/* 创建订单接口 */
export async function createOrder(skuId: string, addressId: string): Promise<string> {
  const res = await request({
    method: 'POST',
    url: ``,
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
  if (res && res.data.data?.order?.order_id) {
    return res.data.data?.order?.order_id as string;
  } else {
    throw new Error(res.data.msg || '');
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
