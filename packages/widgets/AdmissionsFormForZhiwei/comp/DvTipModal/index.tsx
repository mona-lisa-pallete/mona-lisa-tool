import React from 'react';
import { View } from "@tarojs/components";
import { preventDefault } from '../utils';

import "./index.less";

interface IDvTipProps {
  closeHandle?: (event?: any) => void;
  foot?: JSX.Element;
}

const DvTipModal: React.FC<IDvTipProps> = (props) => {
  return (<View className="dv-tip-modal dv-modal" onTouchMove={preventDefault}>
    <View className="dv-tip-modal-container dv-modal-container">
      {props.closeHandle && <View className="dv-modal-close-btn" onClick={props.closeHandle}></View>}
      <View className="dv-tip-modal-title">提示</View>
      <View className="dv-tip-modal-content">{props.children}</View>
      {props.foot && <View className="dv-tip-modal-foot">{props.foot}</View>}
    </View>
  </View>);
}
export default DvTipModal;
