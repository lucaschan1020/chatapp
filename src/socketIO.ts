import { io } from 'socket.io-client';
import getGapiAuthInstance from './apis/gapiAuth';
const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN ?? '';

const socket = io(SERVER_DOMAIN, { autoConnect: false });
const connectSocket = async () => {
  const token = (await getGapiAuthInstance()).currentUser
    .get()
    .getAuthResponse().id_token;
  socket.auth = { token };

  socket.connect();
};

export { connectSocket };
export default socket;
