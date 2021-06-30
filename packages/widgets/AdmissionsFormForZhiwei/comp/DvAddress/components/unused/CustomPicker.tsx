import { FC } from 'react';
import { View } from '@tarojs/components';
import PickerTabs from './pickerTabs';
import PickerList from './pickerList';

type Props = {
  show?: boolean;
  title: string;
  tabs: any;
};

const CustomPicker: FC<Props> = (props) => {
  const { show, tabs, title } = props;

  if (!show) {
    return null;
  }

  return (
    <View>
      <View>close icon</View>
      <View>title</View>
      <View></View>
    </View>
  );
};

export default CustomPicker;
