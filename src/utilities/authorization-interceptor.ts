import { InternalAxiosRequestConfig } from 'axios';
import getGapiAuthInstance from '../apis/gapiAuth';

const authorizationInterceptor = async (config: InternalAxiosRequestConfig) => {
  const token = (await getGapiAuthInstance()).currentUser
    .get()
    .getAuthResponse().id_token;
  if (!token) return config;
  config.headers!['Authorization'] = `Bearer ${token}`;
  return config;
};

export default authorizationInterceptor;
