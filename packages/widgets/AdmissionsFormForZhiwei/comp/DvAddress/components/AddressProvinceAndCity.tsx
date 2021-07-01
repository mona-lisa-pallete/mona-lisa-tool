import { View } from '@tarojs/components';
import React, {
  useContext,
  useEffect,
  useState,
  useImperativeHandle,
  useMemo,
  useCallback,
} from 'react';
import { ServiceContext } from '../hooks/CacheService';
import cls from 'classnames';
import PickerTabs from './pickerTabs';
import PickerList from './pickerList';
import { IErrorTip } from '../../types';
import * as trackerAdmissions from '../../utils/admissionsTracker'

import './AddressProvinceAndCity.less';

type selectedData = {
  /**
   * 两个选择框交互的内容
   */
  provinceId: number;
  cityId: number;
  connectAddress?: string;
  provinceName: string;
  cityName: string;
  regionName?: string;
  regionId?: number;

  /**
   * 详细地址
   */
  contactAddress?: string;
};

type Props = {
  /**
   * 初始化省code id
   */
  // initialProvinceId: number;
  /**
   * 初始化城市code id
   */
  // initialCityId: number;
  /**
   * 与外部通信
   */
  onChange: (args: Partial<selectedData>) => void;
  /**
   * 初始时候picker是否展开
   */
  initialPickerState?: boolean;
  /**
   * 开启则为受控
   */
  value?: selectedData;
  /**
   * 因为小程序内 textarea 是原生组件，placeholder 会遮盖 modal
   */
  showAddressDetail?: boolean;
  /**
   * 暴露方法
   */
  actionRef?: any;
  // 打开县区选择
  showDistrictModal: () => void;
  errorTip: IErrorTip;
  setErrorTip: (e: IErrorTip) => void;
};

function AddressProvinceAndCity(props: Props) {
  const { onChange, value, actionRef, showDistrictModal, errorTip, setErrorTip } = props;
  const { fetchCity, fetchProvince } = useContext(ServiceContext);
  const [showPicker, setShowPicker] = useState(false);

  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [provinceId, setProvinceId] = useState(null);
  const [cityId, setCityId] = useState(0);

  const [tabIndex, setTabIndex] = useState(0);
  const [provinceName, setProvinceName] = useState('');

  useImperativeHandle(actionRef, () => {
    return {
      a: () => console.log('xixi'),
      validate: () => {},
    };
  });

  // 更改省份
  const onProvinceChange = useCallback(
    async (nextProvince: { code: number; name: string }) => {
      if (nextProvince.code === provinceId) return;

      setProvinceId(nextProvince.code);
      setProvinceName(nextProvince.name);
      setCityId(0);
      setCityList([]);
      setTabIndex(1);
    },
    [setProvinceId, setProvinceName, setCityId, setCityList, setTabIndex],
  );

  // 更改城市
  const onCityChange = useCallback(
    async (nextCity: { code: number; name: string }) => {
      // setLoading(true);
      let region = {};
      if (nextCity.code !== cityId) {
        setCityId(nextCity.code);
        region = {
          regionId: 0,
          regionName: '',
        };
      }

      // 更新外部值
      onChange({
        ...value,
        cityId: nextCity.code,
        cityName: nextCity.name,
        provinceId,
        provinceName,
        ...region,
      });

      setShowPicker(false);
      showDistrictModal();
    },
    [onChange, setShowPicker, setCityId, provinceName, provinceId, showDistrictModal],
  );

  // 渲染控制
  const tabsKeys = useMemo(() => {
    return [
      {
        name: provinceName || value?.provinceName || '请选择省份',
        list: provinceList,
        activeCode: value?.provinceId,
        onChange: onProvinceChange,
      },
      {
        name: value?.cityName || '请选择市',
        list: cityList,
        activeCode: value?.cityId,
        onChange: onCityChange,
      },
    ];
  }, [
    cityList,
    provinceList,
    value,
    value?.provinceId,
    value?.cityId,
    onCityChange,
    onProvinceChange,
    provinceId,
    provinceName,
  ]);

  useEffect(() => {
    async function fetch() {
      if (typeof provinceId === 'number') {
        const citys = await fetchCity(provinceId);
        setCityList(citys);
      }
    }

    fetch();
  }, [provinceId, value?.provinceId]);

  useEffect(() => {
    async function fetchName() {
      let params = {};
      if (!value?.provinceName && typeof value?.provinceId === 'number') {
        const provinceListData = await fetchProvince();
        setProvinceList(provinceListData);

        const initialProvinceName =
          provinceListData.find((o) => {
            return o.code === value?.provinceId;
          })?.name || '';

        if (initialProvinceName) {
          params['provinceName'] = initialProvinceName;
        }
      }
      if (!value?.cityName && typeof value?.cityId === 'number') {
        const cityListData = await fetchCity(value?.provinceId);

        setCityList(cityListData);
        const initialCityName =
          cityListData.find((o) => {
            return o.code === value?.cityId;
          })?.name || '';

        if (initialCityName) {
          params['cityName'] = initialCityName;
        }
      }
      // onChange(params);
      if (Object.keys(params).length > 0) {

        onChange(params);
      }
    }

    fetchName();
  }, [value?.cityName, value?.cityId, value?.provinceId, value?.provinceName]);

  useEffect(() => {
    async function fetch() {
      const provinceListData = await fetchProvince();
      setProvinceList(provinceListData);
      if (typeof value?.provinceId === 'number') {
        const citys = await fetchCity(value?.provinceId);
        setCityList(citys);
      }
    }
    fetch();

  }, []);

  const connectAddressCopy = useMemo(() => {
    return `${value?.provinceName || ''}${value?.cityName || ''}`;
  }, [value?.provinceName, value?.cityName]);

  return (
    <>
      <View
        className={`address_input ${errorTip?.province ? 'error-tip' : ''}`}
        onClick={() => {
          setShowPicker((prev) => !prev);
          errorTip?.province && setErrorTip({...errorTip, province: null});
        }}
      >
        <View className="address_input__text">
          {connectAddressCopy || <span style={{color: '#999999'}}>请选择省市</span>}
        </View>
        <View className="address_input__icon" />
      </View>
      <View
        className={cls('picker', {
          'picker--hide': !showPicker,
        })}
      >
        <View className="picker_container">
          <View
            className="close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowPicker(false);
            }}
          ></View>
          <View className="picker__title">请选择所在地区</View>
          <PickerTabs
            keys={tabsKeys}
            activeKey={tabIndex}
            onChange={(next) => {
              trackerAdmissions.track_click_address_province();
              setTabIndex(next);
            }}
          />
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
            className="inner-scroll"
          >
            {tabsKeys.map((item, i) => {
              const active = i === tabIndex;
              return (
                <PickerList
                  key={i}
                  data={item.list}
                  hide={!active}
                  onChange={item.onChange}
                  activeCode={item.activeCode!}
                  loading={(item?.list?.length || 0) === 0}
                />
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
}

export default AddressProvinceAndCity;
