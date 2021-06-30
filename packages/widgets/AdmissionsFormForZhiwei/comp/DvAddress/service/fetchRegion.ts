import { request } from '@tarojs/taro';

const isProduction: boolean = /https/.test(window.location.host);

const regionUrl: string = !isProduction
  ? 'http://sellapi.dev.guorou.net/sellapi/1/region/district/get'
  : 'https://sellapi.guorou.net/sellapi/1/region/district/get';

interface IParams {
  code?: number;
}

async function fetchRegion(params?: IParams): Promise<{
  code: number;
  data: { code: number; name: string; parentCode: number; level: number };
}> {
  const data = await request({
    method: 'GET',
    url: regionUrl,
    data: params,
  });

  return data?.data;
}

export default fetchRegion;
