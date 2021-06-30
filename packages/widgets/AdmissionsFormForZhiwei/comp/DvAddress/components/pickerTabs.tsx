import { View } from '@tarojs/components';
import cls from 'classnames';
import React from 'react'

import './pickerTabs.less';

type TabKey = {
  /**
   * 唯一名称
   */
  name: string;
  /**
   * 值
   */
  // value: number;
};

type Props = {
  /**
   * keys
   *
   */
  keys: TabKey[];
  /**
   * 选中的key
   */
  activeKey: number;
  /**
   * 每次改变
   */
  onChange: (k: number) => void;
};

function Tabs(props: Props) {
  const { keys, activeKey, onChange } = props;
  return (
    <View className={cls('dv_address_picker_tabs')}>
      {keys.map((key, i) => {
        return (
          <View
            className={cls('dv_address_picker_tab', {
              'dv_address_picker_tab--active': activeKey === i,
            })}
            onClick={() => onChange(i)}
            key={i}
          >
            {key.name}
            <View
              className={cls('dv_address_picker_tab__underline', {
                ['dv_address_picker_tab__underline--hide']: activeKey !== i,
              })}
            />
          </View>
        );
      })}
    </View>
  );
}

export default Tabs;
