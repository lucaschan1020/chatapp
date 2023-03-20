import axios from 'axios';
import authorizationInterceptor from '../utilities/authorization-interceptor';
const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN ?? '';
const privateChannelAPI = axios.create({
  baseURL: `${SERVER_DOMAIN}/api/private-channel`,
});

privateChannelAPI.interceptors.request.use(authorizationInterceptor);

export default privateChannelAPI;
