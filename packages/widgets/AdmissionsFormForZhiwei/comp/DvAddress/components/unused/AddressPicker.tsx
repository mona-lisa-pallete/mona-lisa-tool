import React, {
  PureComponent,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { View, Button } from '@tarojs/components';
import get from 'lodash/get';
import { GDRule, GZRule, ProvinceRule } from '../utils/index';
import './AddressPicker.less';

// 步骤 省 -> 市 -> 区
const STEP_MAP = ['province', 'city', 'district'];

const filterData = (data) =>
  data.map(({ adcode, name, districts, level }) => ({
    adcode,
    name,
    level,
    next: districts ? !!districts.length : false,
  }));

interface IAddressPicker {
  onClose: () => void;
  onChange: (arg: any) => void;
  show: boolean;
}

async function sleepAndMockData(code) {
  return [];
}

function AddressPicker(props: IAddressPicker) {
  const { show, onClose, onChange } = props;
  const [list, setList] = useState([]);
  // const [provinceList, setProvinceList] = useState([]);
  const [originalProvinceList, setOriginalProvinceList] = useState([]);
  // const [cityList, setCityList] = useState([]);
  // const [districtList, setDistrictList] = useState([]);
  // name it
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const [selected, setSelected] = useState({
    province: '',
    city: '',
    district: '',
  });
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  const getDistrictList = useCallback(
    async (code) => {
      const { data } = { data: [] };
      const _origin = [...originalProvinceList];
      _origin.push(data);

      setList(data);
      setOriginalProvinceList(_origin);
      setLoading(false);

      return data;
    },
    [originalProvinceList],
  );

  const jumpToStep = useCallback(
    (step) => {
      listRef.current.scrollTop = 0;
      setList([...originalProvinceList[step]]);
      setStep(step);
    },
    [originalProvinceList],
  );

  const onSelect = useCallback(
    async (selectedAddress) => {
      const stepName = STEP_MAP[step];
      const selectedName = selectedAddress.name;
      setSelected((prevState) => {
        return {
          ...prevState,
          [stepName]: selectedName,
        };
      });
      const listData = await sleepAndMockData(selectedAddress.code);
      if (!listData.length) {
        onChange(selected);
        return;
      }
      setStep((prev) => prev + 1);
    },
    [step],
  );

  useEffect(() => {
    if (show === false) {
      setList([]);
      setSelected({ province: '', district: '', city: '' });
      setOriginalProvinceList([]);
      setStep(0);
    }
  }, [show]);

  useEffect(() => {
    listRef.current.scrollTop = 0;
    headerRef.current.scrollLeft = headerRef.current.scrollWidth;
  }, [step]);

  if (!show) {
    return null;
  }

  return (
    <View className="address_picker">
      <View className="address_container">
        <View className="select_header" ref={headerRef}>
          {STEP_MAP.map((s, i) =>
            step >= i ? (
              <View
                className={`select_header_item ${i === step ? 'disabled' : ''}`}
                key={s}
                onClick={() => jumpToStep(i)}
              >
                {i === step ? '请选择' : selected[s]}
              </View>
            ) : null,
          )}
          <Button plain className="cancel_btn" onClick={onClose}>
            取消
          </Button>
        </View>
        <View className="select_list" ref={listRef}>
          {loading && <View className="loading_wrap">正在获取地区数据...</View>}
          {list.map((l) => (
            <View
              className="select_item"
              key={l.adcode}
              onClick={() => this.onSelect(l)}
            >
              {l.name}
              {l.next}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default AddressPicker;
