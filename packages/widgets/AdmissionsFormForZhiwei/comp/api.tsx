import { request } from '@tarojs/taro';

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

// TODO: 这里需要从url获取
const sellType: string = '';
const source: string = '';
const source_hash: string = '';

const currentApiHost = apiHosts[window.location.host] || apiHosts.mock;

export const GRADE = [ '一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二',];

export interface IOfflineData {
  institution_name: string;
  institution_type: number;
  school_id: number;
  show_institution_name: boolean;
  show_clazz: boolean;
  clazz_necessary: boolean;
  grades: number[];
  subjects: number[];
  time_seqs: number[];
  clazz_type: number;
  clazz_type_name: string;
  year: number;
}

/** 获取线下设置配置 */
export async function getOfflineData(): Promise<IOfflineData> {
  const data = await request({
    method: 'GET',
    url: 'http://mock.guorou.local/mock/242/getData',
    data: {
      source_hash: 'test souce hash',
    }
  });
  console.log('请求回来的数据', data);
  return data.data as IOfflineData;
}

export interface IPostOfflineData {
  /** 页面地址 */
  url: string;
  /** 手机号 */
  phone: string;
  /** 学生名称 */
  name: string;
  /** 联系人手机号 */
  contactPhone: string;
  /** 联系人姓名 */
  contactName: string;
  /** 详细地址 */
  contactAddress: string;
  /** 行政省 id */
  provinceId: number;
  /** 行政市 id */
  cityId: number;
  /** 行政区 id */
  regionId: number;
  /** 班级 */
  clazz?: string;
  /** 关联学校 id */
  schoolId?: string;
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
export async function createAddress() {
  const res = await request({
    method: 'GET',
    url: `${currentApiHost.sell_api}/api/1/pay/update_order_address`,
    data: {
      /* 收货地址id */
      id: '',
      /* 联系人姓名 */
      contact_name: '',
      /* 联系人电话 */
      contact_phone: '',
      /* 国家 */
      country: '',
      /* 省份 */
      province: '',
      /** 城市 */
      city: '',
      /* 县区 */
      district: '',
      /* 街道 */
      street: '',
      /* 详细地址 */
      detail: '',
      /* 是否默认 */
      is_default: 0,
    }
  })
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
