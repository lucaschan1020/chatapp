import axios from 'axios';
import authorizationInterceptor from '../utilities/authorization-interceptor';
const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN ?? '';
const friendAPI = axios.create({
  baseURL: `${SERVER_DOMAIN}/api/friend`,
});

friendAPI.interceptors.request.use(authorizationInterceptor);

export default friendAPI;
