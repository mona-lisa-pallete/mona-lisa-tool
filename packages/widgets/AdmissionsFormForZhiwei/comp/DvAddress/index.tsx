import { Image, View } from '@tarojs/components';
import React, { useState } from 'react';
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
  const districtValue = pick(value, ['districtId', 'districtName']);
  const addressDetail = pick(value, ['addressDetail']);

  const onChange = (_v) => {
    propsOnChange({
      ...value,
      ..._v,
    });
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
          <AddressProvinceAndCity onChange={onChange} value={provinceAndCity} />
          <AddressDistrict
            cityId={provinceAndCity.cityId}
            value={districtValue}
            onChange={onChange}
          />
          <AddressDetailTextarea
            value={addressDetail?.addressDetail}
            onChange={(e) => {
              const val = e.target.value;
              onChange({
                addressDetail: val,
              });
            }}
          />
        </View>
      </Provider>
    </View>
  );
};
export default DvAddress;
