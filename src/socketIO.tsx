import { ThunkDispatch } from 'redux-thunk';
import socketIOClient from 'socket.io-client';
import { AppState, store } from './state';
import {
  ChatMessageAction,
  ReceiveChatMessage,
} from './state/actions/ChatMessageActionCreator';

const socket = socketIOClient(':5000');

socket.on('SendChatMessage', (chatContent: string) => {
  (store.dispatch as ThunkDispatch<AppState, unknown, ChatMessageAction>)(
    ReceiveChatMessage(chatContent)
  );
});

export default socket;
