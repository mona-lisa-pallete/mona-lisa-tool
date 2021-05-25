import React from 'react';
import { DvImageProps } from './types';
import './index.less';
import { Button, Image, View } from '@tarojs/components';

const DvImage: React.FC<DvImageProps> = (props) => {
  const { url } = props;

  console.log(url, 222222222);
  // return(
  //   <Button>22222</Button>
  // )
  return <Image className="dv-image" src={url} mode="widthFix" />;
};

export default DvImage;
