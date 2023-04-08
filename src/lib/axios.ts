import { SERVER_DOMAIN } from '@/config/env-keys';
import getGapiAuthInstance from '@/lib/gapi-auth';
import Axios, { InternalAxiosRequestConfig } from 'axios';

const authorizationInterceptor = async (config: InternalAxiosRequestConfig) => {
  const gapiAuthInstance = await getGapiAuthInstance();
  const token = gapiAuthInstance.currentUser.get().getAuthResponse().id_token;
  if (!token) return config;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const axios = Axios.create({
  baseURL: SERVER_DOMAIN,
});

axios.interceptors.request.use(authorizationInterceptor);

export default axios;
