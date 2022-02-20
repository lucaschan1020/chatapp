import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '..';
import { IChatMessage } from '../../interfaces';
import socket from '../../socketIO';
import { ActionType } from '../action-types';

interface AddChatMessageAction {
  type: ActionType.AddChatMessage;
  payload: IChatMessage;
}

const AddChatMessage = (chatMessage: IChatMessage): AddChatMessageAction => {
  return {
    type: ActionType.AddChatMessage,
    payload: chatMessage,
  };
};

const SendChatMessage =
  (chatContent: string) =>
  (
    dispatch: ThunkDispatch<AppState, unknown, AddChatMessageAction>,
    _getState: () => AppState
  ) => {
    socket.emit('SendChatMessage', chatContent);
    dispatch(
      AddChatMessage({ sender: 'Me', chatContent, timeStamp: new Date() })
    );
  };

const ReceiveChatMessage =
  (chatContent: string) =>
  (
    dispatch: ThunkDispatch<AppState, unknown, AddChatMessageAction>,
    _getState: () => AppState
  ) => {
    dispatch(
      AddChatMessage({ sender: 'Them', chatContent, timeStamp: new Date() })
    );
  };

export { AddChatMessage, SendChatMessage, ReceiveChatMessage };

export type ChatMessageAction = AddChatMessageAction;
