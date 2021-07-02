import React, { useState, useEffect } from "react";
import { Button, View, Image, Input } from "@tarojs/components";
import { preventDefault, stopPropagation } from '../utils';
import "./modal.less";

interface ModalProps {
  title: string | JSX.Element;
  visiable: boolean;
  emitHide: () => void;
  foot?: JSX.Element;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <View className="dv-modal" style={{display: props.visiable ? 'block' : 'none'}} onClick={props.emitHide} onTouchMove={preventDefault}>
      <View className="dv-modal-container" onClick={stopPropagation}>
        <View className="dv-modal-head">
          {props.title}
          <View className="dv-modal-close-btn" onClick={props.emitHide}></View>
        </View>
        <View className="dv-modal-body" onTouchMove={stopPropagation}>{props.children}</View>
        {props.foot && <View className="dv-modal-foot">{props.foot}</View>}
      </View>
    </View>
  );
}

export default Modal;
