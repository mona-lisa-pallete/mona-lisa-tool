import { useRef } from 'react';
import fetchRegion from '../service/fetchRegion';

function useCacheService() {
  const cityMaps = useRef(new Map());
  const districtMaps = useRef(new Map());
  const provinceMaps = useRef<any>([]);

  const fetchDistrict = async (cityId: number) => {
    return new Promise(async (resolve, reject) => {
      if (districtMaps.current.has(cityId)) {
        const list = districtMaps.current.get(cityId);
        resolve(list);
        return;
      }
      const data = await fetchRegion({
        code: cityId,
      });
      districtMaps.current.set(cityId, data);

      resolve(data.data);
    });
  };

  const fetchProvince = async () => {
    return new Promise(async (resolve, reject) => {
      if (provinceMaps.current.length > 0) {
        resolve(provinceMaps.current);
        return;
      }
      const data = await fetchRegion();
      // console.log(data.data);
      provinceMaps.current = data.data;

      resolve(data.data);
    });
  };

  const fetchCity = async (provinceId: number) => {
    return new Promise(async (resolve, reject) => {
      if (cityMaps.current.has(provinceId)) {
        const list = cityMaps.current.get(provinceId);
        resolve(list);
        return;
      }

      const citys = await fetchRegion({ code: provinceId });
      cityMaps.current.set(provinceId, citys.data);
      resolve(citys.data);
    });
  };

  return {
    fetchProvince,
    fetchDistrict,
    fetchCity,
  };
}

export default useCacheService;
