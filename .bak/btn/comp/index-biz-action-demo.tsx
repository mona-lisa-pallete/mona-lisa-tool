import { Button, View } from "@tarojs/components";
import React from "react";
import { isUserLogged } from "@gr-davinci/sdk";
import "./index.less";

const DvButton = ({ onClick, children }) => {
  return (
    <View
      // onClick 是用户交互触发点，并不处理具体业务，这就是通用组件
      onClick={onClick}
    ></View>
  );
};

// 业务逻辑，通过配置生成，独立存储
const eventHandlers = {
  btnIDOnClick: (pageCtx) => (e) => {
    /**
     * 这里就是业务逻辑：
     * 1. 判断用户是否登录
     * 2. 如果是，doSomething
     * 3. 如果否，打开登录页
     */
    if (isUserLogged) {
      doSomething();
    } else {
      window.open("loginPage");
    }
  },
};

const Page = () => {
  return (
    <DvButton
      // 页面连接了事件与动作
      // 业务逻辑并不在组件内实现，而是通过外部调用
      onClick={eventHandlers["btnIDOnClick"]}
    ></DvButton>
  );
};
