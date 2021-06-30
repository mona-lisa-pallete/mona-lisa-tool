import { useCallback, useMemo, useState } from 'react';
import { View, Textarea } from '@tarojs/components';
import AddressPicker from './components/AddressPicker';
import debounce from 'lodash/debounce';
import './index.less';

function DvAddress(props: {
  defaultAddress: '';
  onChange: () => {};
  value: { addressDetail: string; addressInfo: string };
}) {
  const { onChange, defaultAddress, value: _controlValue } = props;
  const [addressDetail, setAddressDetail] = useState(
    _controlValue?.addressDetail,
  );
  const [addressInfo, setAddressInfo] = useState(
    _controlValue?.addressInfo || '广东省惠州市惠东县',
  );
  const [show, setShow] = useState<boolean>(false);

  const onAddressPickerChange = useCallback(
    (value: { province: string; district: string; city: string }) => {
      const { province, district, city } = value;
      const _a = `${province}${city}${district}`;
      setAddressInfo(_a);
    },
    [],
  );

  const onTextareaChange = useMemo(() => {
    return debounce((value) => {
      setAddressDetail(value);
    }, 200);
  }, []);

  return (
    <View className="dv_address">
      <View
        className="dv_address_info_input"
        onClick={() => setShow((prev) => !prev)}
      >
        <View>{addressInfo}</View>
        <View className="dv_address_select_icon"></View>
      </View>
      <View className="dv_address_detail_textarea">
        <Textarea
          onInput={onTextareaChange}
          value={addressDetail}
          placeholder="请输入详细地址"
        ></Textarea>
      </View>
      <AddressPicker
        show={show}
        onClose={() => setShow(false)}
        onChange={onAddressPickerChange}
      />
    </View>
  );
}

export default DvAddress;
