export interface OfflineData {
  institution_name: string;
  show_institution_name: boolean;
  show_clazz: boolean;
  clazz_necessary: boolean;
  grades: number[];
  school_id: any;
  institution_type: any;
  subjects: number[];
  time_seqs: number[];
}

export type Products = subjectItem[];

export interface subjectItem {
  subject_id: number;
  subject_name: string;
  product_list: Array<ProductItem>;
  subjectLimited?: boolean;
}

export interface ProductItem {
  id: number;
  name: string;
  clazz_name: string;
  type: number;
  subject_id: number;
  time_text: string;
  time_seq: number /* 期数 */;
  material_name: string /* 版本 */;
  sell_info: {
    sell_limit: number /* 预设库存 */;
    sold_num: number /* 已售数量 */;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface ICreateAddressData {
  /* 收货地址id */
  id?: string;
  /* 联系人姓名 */
  contact_name: string;
  /* 联系人电话 */
  contact_phone: string;
  /* 国家 */
  country: string;
  /* 省份 */
  province: string;
  /** 城市 */
  city: string;
  /* 县区 */
  district: string;
  /* 街道 */
  street: string;
  /* 详细地址 */
  detail: string;
}

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
  province_id: number;
  city_id: number;
  region_id: number;
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
  provinceId: any;
  /** 行政市 id */
  cityId: any;
  /** 行政区 id */
  regionId: any;
  /** 班级 */
  clazz?: string;
  /** 关联学校 id */
  schoolId?: string;
}

export interface IFormData {
  name: string;
  grade: number;
  subject: number;
  clazz: string;
  time: number;
  contactName: string;
  contactPhone: string;
  skuId: number;
  product: string;
  regionName?: string;
  cityName?: string;
  provinceName?: string;
  contactAddress?: string;
  cityId?: number;
  regionId?: number;
  provinceId?: number;
}

export interface IErrorTip {
  name?: string;
  selectTime?: string;
  clazz?: string;
  contactName?: string;
  contactPhone?: string;
  address?: string;
}
