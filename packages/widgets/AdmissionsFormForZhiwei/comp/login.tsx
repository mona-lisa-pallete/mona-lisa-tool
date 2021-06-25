import React, { useState, useEffect } from "react";
import { Button, View, Image } from "@tarojs/components";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
  return (<View className="login">
    <Button onClick={() => props.onLogin()}>登录</Button>
  </View>);
};

export default Login;
