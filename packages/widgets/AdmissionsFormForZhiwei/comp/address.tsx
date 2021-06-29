import React, { useState, useEffect } from "react";
import { Button, View, Image } from "@tarojs/components";

interface AddressProps {
  defaultValue: {}; // 省市
  onChange: () => void;
}

const Address: React.FC<AddressProps> = (props) => {
  return (<View className="address">
    地址选择
  </View>);
};

export default Address;
