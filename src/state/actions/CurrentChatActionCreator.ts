import { IPrivateChannel } from '../../interfaces';
import { ActionType } from '../action-types';

interface ChangeCurrentChatAction {
  type: ActionType.ChangeCurrentChat;
  payload: IPrivateChannel;
}

const ChangeCurrentChat = (
  newCurrentChat: IPrivateChannel
): ChangeCurrentChatAction => {
  return {
    type: ActionType.ChangeCurrentChat,
    payload: newCurrentChat,
  };
};

export { ChangeCurrentChat };

export type CurrentChatAction = ChangeCurrentChatAction;
