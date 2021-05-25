import { OssUploadPolicy } from './schema';

import axios from 'axios';

interface IResponse<T> {
  code: number;
  msg: string;
  data: T;
}

const requestInstance = axios.create({
  baseURL: '',
});

requestInstance.interceptors.request.use((config) => {
  return config;
});

requestInstance.interceptors.response.use((response: any) => {
  return response.data;
});

export default requestInstance;

const getUploadPolicy = async (params: { dirPath: string; customFilename?: boolean }) =>
  requestInstance.request<OssUploadPolicy, IResponse<OssUploadPolicy>>({
    url: '/auth/api/1/oss/policy',
    params,
  });

export { getUploadPolicy };
