import { Image, View } from '@tarojs/components';
import React, { useState, useRef } from 'react';
import AddressProvinceAndCity from './components/AddressProvinceAndCity';
import { Provider } from './hooks/CacheService';
import AddressDistrict from './components/AddressDistrict';
import AddressDetailTextarea from './components/AddressDetailTextarea';
import pick from 'lodash/pick';

import './index.less';

const DvAddress: React.FC<{
  onChange: (arg: any) => void;
  value: any;
}> = (props) => {
  const { value, onChange: propsOnChange } = props;
  const provinceAndCity = pick(value, [
    'provinceId',
    'cityId',
    'provinceName',
    'cityName',
  ]);
  const districtValue = pick(value, ['regionId', 'regionName']);
  const contactAddress = pick(value, ['contactAddress']);

  const onChange = (_v) => {
    propsOnChange({
      ...value,
      ..._v,
    });
  };
  const districtRef = useRef();
  const showDistrictModal = () => {
    (districtRef as any).current?.showDistrict();
  };
  return (
    <View
      className="address_wrapper"
    >
      <Provider>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            flexWrap: 'wrap',
            boxSizing: 'border-box',
          }}
        >
          <AddressProvinceAndCity
            onChange={onChange}
            value={provinceAndCity}
            showDistrictModal={showDistrictModal}
          />
          <AddressDistrict
            cityId={provinceAndCity.cityId}
            value={districtValue}
            ref={districtRef}
            onChange={onChange}
          />
          <AddressDetailTextarea
            value={contactAddress?.contactAddress}
            placeholder="请输入详细收货地址"
            onChange={(e) => {
              const val = e.target.value;
              onChange({
                contactAddress: val,
              });
            }}
          />
        </View>
      </Provider>
    </View>
  );
};
export default DvAddress;
