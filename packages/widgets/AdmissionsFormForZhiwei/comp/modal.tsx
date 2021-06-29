import React, { useState, useEffect } from "react";
import { Button, View, Image, Input } from "@tarojs/components";

interface ModalProps {
  title: string;
  visiable: boolean;
  emitHide: () => void;
  foot?: JSX.Element;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <View className="modal" style={{display: props.visiable ? 'block' : 'none'}} onClick={props.emitHide}>
      <View className="modal-container" onClick={e => e.stopPropagation()}>
        <View className="modal-head">
          {props.title}
          <View className="close-btn" onClick={props.emitHide}>
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2l-275.2-277.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l275.2 277.333333-277.333333 275.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333L512 556.8 787.2 832c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L556.8 512z" ></path></svg>
          </View>
        </View>
        <View className="modal-body">{props.children}</View>
        {props.foot}
      </View>
    </View>
  );
}

export default Modal;
