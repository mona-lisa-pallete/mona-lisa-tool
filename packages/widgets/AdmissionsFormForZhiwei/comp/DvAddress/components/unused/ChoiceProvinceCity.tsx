import { FC, useEffect, useState } from 'react';
import { View } from '@tarojs/components';

export interface ILocationChangeParams {
  provinceId: number;
  cityId: number;
}

type Props = {
  show?: boolean;
  provinceId?: number;
  cityId?: number;
  onChange?: (params: ILocationChangeParams) => void;
};

const ChoiceProvinceCity: FC<Props> = ({
  show,
  provinceId: propsProvinceId,
  cityId: propsCityId,
  onChange,
}) => {
  const [tabKey, setTabKey] = useState(() => (propsCityId ? '1' : '2'));
  const [provinceList, setProvinceList] = useState([]);
  const [provinceId, setProvinceId] = useState(propsProvinceId);
  const [cityId, setCityId] = useState(propsCityId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);
  useEffect(() => {}, []);
  useEffect(() => {}, []);

  return <View></View>;
};
