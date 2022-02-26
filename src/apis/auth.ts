import axios from 'axios';
const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN ?? '';
export default axios.create({
  baseURL: `${SERVER_DOMAIN}/api/auth`,
});
