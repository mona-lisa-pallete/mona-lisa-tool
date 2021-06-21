import { Button, View } from "@tarojs/components";
import React from "react";
import { isUserLogged } from "@gr-davinci/sdk";
import "./index.less";

const DvButton = ({ onClick, children }) => {
  return (
    <View
      // onClick 直接执行一段业务逻辑，事件与动作没有分离，业务逻辑包含在组件内
      // 这里是业务组件的本质
      onClick={(e) => {
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
      }}
    ></View>
  );
};

export default DvButton;
