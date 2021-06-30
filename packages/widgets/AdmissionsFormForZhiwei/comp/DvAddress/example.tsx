import { useState, useEffect } from 'react';
import Address from './index';

function IndexPage() {
  const [state, setState] = useState({
    provinceId: 0,
    cityId: 0,
    provinceName: '',
    cityName: '',

    districtId: 0,
    districtName: '',

    addressDetail: '',
  });

  useEffect(() => {
    setTimeout(() => {
      setState({
        provinceId: 370000,
        cityId: 370100,
        provinceName: '',
        cityName: '',

        districtId: 0,
        districtName: '',

        addressDetail: '',
      });
    }, 3000);
  }, []);

  console.log(state, 'this.state');

  const onChange = (value) => {
    console.log('执行', value);
    setState((prev) => ({
      ...prev,
      ...value,
    }));
  };

  return <Address value={state} onChange={onChange} />;
}

export default IndexPage;
