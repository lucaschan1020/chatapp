import socketIOClient from 'socket.io-client';
import { store } from './state';
import { ReceiveChatMessage } from './state/reducers/ChatMessageSlice';
const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN ?? '';
const socket = socketIOClient(SERVER_DOMAIN);

socket.on('SendChatMessage', (chatContent: string) => {
  store.dispatch(ReceiveChatMessage(chatContent));
});

export default socket;
