import { ServiceContext } from '../hooks/CacheService';
import { View } from '@tarojs/components';
import React, { useContext, useEffect, useImperativeHandle, useState } from 'react';
import PickerTabs from './pickerTabs';
import Taro from '@tarojs/taro';
import cls from 'classnames';
import PickerList from './pickerList';
import { IErrorTip } from '../../types';
import * as trackerAdmissions from '../../utils/admissionsTracker'


import './AddressProvinceAndCity.less';
import './AddressDistrict.less';

interface Props {
  // show?: boolean;
  regionId?: number;
  cityId?: number;
  regionName?: string;
  onChange: (value: any) => void;
  errorTip: IErrorTip;
  setErrorTip: (e: IErrorTip) => void;
  value: any;
}

function AddressDistrict(props: Props, ref: any) {
  const {
    value,
    cityId,
    onChange: propsOnChange,
    errorTip,
    setErrorTip
  } = props;
  const { fetchDistrict } = useContext(ServiceContext);
  const [districtList, setDistrictList] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      validate: () => {},
      showDistrict: () => {
        setShow(true);
      }
    };
  }, [setShow]);

  useEffect(() => {
    async function fetch() {
      if (cityId) {
        setDistrictList([]);
        const districtList = await fetchDistrict(cityId);
        const index = districtList.findIndex(item => item.code === value?.regionId && item.name === value?.regionName);
        if (index === -1) {
          propsOnChange({
            regionId: 0,
            regionName: '',
          });
        }
        setDistrictList(districtList);
      }
    }
    fetch();
  }, [cityId]);

  const tabKeys = [
    {
      name: value?.regionName || '请选择区县',
      list: districtList,
      onChange: (nextCity) => {
        propsOnChange({
          regionId: nextCity.code,
          regionName: nextCity.name,
        });
        setShow(false);
      },
    },
  ];

  const onClick = (e) => {
    errorTip?.district && setErrorTip({...errorTip, district: null});
    if (!cityId) {
      Taro.showToast({
        title: '请确保先选择省市',
      });
      return;
    }

    setShow(true);
  };
  return (
    <View>
      <View className={`district_input ${errorTip?.province ? 'error-tip' : ''}`} onClick={onClick}>
        <View
          className={cls('district_input__text', {
            'district_input__text--placeholder': !value?.regionName,
          })}
        >
          {value?.regionName || '区/县'}
        </View>
        <View className="district_input__icon" />
      </View>
      <View
        className={cls('picker', {
          'picker--hide': !show,
        })}
      >
        <View className="picker_container">
          <View
            className="close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShow(false);
            }}
          ></View>
          <View className="picker__title">请选择所在区县</View>
          <PickerTabs
            keys={tabKeys}
            onChange={(nextTabIndex) => {
              trackerAdmissions.track_click_address_city();
              setTabIndex(nextTabIndex);
            }}
            activeKey={tabIndex}
          />
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            {tabKeys.map((item, i) => {
              return (
                <PickerList
                  data={item.list}
                  onChange={item.onChange}
                  activeCode={value?.regionId!}
                  loading={(item?.list?.length || 0) === 0}
                  hide={false}
                  key={i}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}
export default React.forwardRef(AddressDistrict);
