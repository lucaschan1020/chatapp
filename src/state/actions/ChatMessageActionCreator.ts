import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '..';
import socket from '../../socketIO';
import { ActionType } from '../action-types';

interface AddChatMessageAction {
  type: ActionType.AddChatMessage;
  payload: string;
}

const AddChatMessage = (chatContent: string): AddChatMessageAction => {
  return {
    type: ActionType.AddChatMessage,
    payload: chatContent,
  };
};

const SendChatMessage =
  (chatContent: string) =>
  (
    dispatch: ThunkDispatch<AppState, unknown, AddChatMessageAction>,
    _getState: () => AppState
  ) => {
    socket.emit('SendChatMessage', chatContent);
    dispatch(AddChatMessage(chatContent));
  };

const ReceiveChatMessage =
  (chatContent: string) =>
  (
    dispatch: ThunkDispatch<AppState, unknown, AddChatMessageAction>,
    _getState: () => AppState
  ) => {
    dispatch(AddChatMessage(chatContent));
  };

export { AddChatMessage, SendChatMessage, ReceiveChatMessage };

export type ChatMessageAction = AddChatMessageAction;
