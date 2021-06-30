import React, { FC } from 'react';
import { View } from '@tarojs/components';

import './loading.less';

const Loading: FC<{ style?: React.CSSProperties; scale?: number }> = ({
  style,
  scale = 1,
}) => {
  return (
    <View
      className="lds-spinner"
      style={{ ...style, transform: `scale(${scale})` }}
    >
      <View className="lds-spinner-item" />
      <View className="lds-spinner-item" />
      <View className="lds-spinner-item" />
      <View className="lds-spinner-item" />
      <View className="lds-spinner-item" />
      <View className="lds-spinner-item" />
      <View className="lds-spinner-item" />
      <View className="lds-spinner-item" />
      <View className="lds-spinner-item" />
      <View className="lds-spinner-item" />
      <View className="lds-spinner-item" />
      <View className="lds-spinner-item" />
    </View>
  );
};

export default Loading;
