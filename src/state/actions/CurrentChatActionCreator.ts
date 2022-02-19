import PrivateChannel from '../../interfaces/PrivateChannel';
import { ActionType } from '../action-types';

interface ChangeCurrentChatAction {
  type: ActionType.ChangeCurrentChat;
  payload: PrivateChannel;
}

const ChangeCurrentChat = (
  newCurrentChat: PrivateChannel
): ChangeCurrentChatAction => {
  return {
    type: ActionType.ChangeCurrentChat,
    payload: newCurrentChat,
  };
};

export { ChangeCurrentChat };

export type CurrentChatAction = ChangeCurrentChatAction;
