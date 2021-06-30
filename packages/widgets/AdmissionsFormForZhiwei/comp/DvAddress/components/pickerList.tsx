import { View } from '@tarojs/components';
import React, { FC, ReactNode, useCallback, memo } from 'react';
import cls from 'classnames';

import './pickerList.less';
import Loading from './loading';

type region = { code: number; name: string; parentCode: number; level: number };

type Props<T> = {
  data: T[];

  activeCode: region['code'];

  onChange: (arg: region) => void;

  loading: boolean;
  hide: boolean;
};

function List<T extends region>(props: Props<T>) {
  const { data, activeCode, onChange } = props;

  const compareActive = useCallback(
    (item: region) => {
      // console.log(item.code, activeCode);
      return item.code === activeCode;
    },
    [data, activeCode],
  );

  const onClick = useCallback(
    (item) => {
      console.log(onChange, item);
      return onChange(item);
    },
    [onChange],
  );
  if (props.hide) {
    return null;
  }

  if (props.loading) {
    return <Loading />;
  }

  return (
    <View className={cls('dv_address_picker_list')}>
      {data.map((dataItem) => {
        const active = compareActive(dataItem);
        return (
          <View
            className={cls('dv_address_picker_list-item', {
              ['dv_address_picker_list-item--active']: active,
            })}
            onClick={() => onClick(dataItem)}
            key={dataItem.code}
          >
            <View className={cls('dv_address_picker_list-item__text')}>
              {dataItem.name}
            </View>
            <View className={cls('dv_address_picker_list-item__icon')}></View>
          </View>
        );
      })}
    </View>
  );
}

export default memo(List);
