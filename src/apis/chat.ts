import axios from 'axios';
import authorizationInterceptor from '../utilities/authorization-interceptor';
const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN ?? '';
const chatAPI = axios.create({
  baseURL: `${SERVER_DOMAIN}/api/chat`,
});
chatAPI.interceptors.request.use(authorizationInterceptor);

export default chatAPI;
