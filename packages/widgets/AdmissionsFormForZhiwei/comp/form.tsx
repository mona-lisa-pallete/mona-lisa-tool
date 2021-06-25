import React, { useState, useEffect } from "react";
import { Button, View, Image } from "@tarojs/components";

interface FormProps {
  defaultValue: {}; // 省市
  onChange: () => void;
}

const Form: React.FC<FormProps> = (props) => {
  return (<View className="form">
    表单编写
  </View>);
};

export default Form;
