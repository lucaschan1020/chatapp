import { PrivateChannelItem } from '../../interfaces';
import { ActionType } from '../action-types';

interface ChangeCurrentChatAction {
  type: ActionType.ChangeCurrentChat;
  payload: PrivateChannelItem;
}

const ChangeCurrentChat = (
  newCurrentChat: PrivateChannelItem
): ChangeCurrentChatAction => {
  return {
    type: ActionType.ChangeCurrentChat,
    payload: newCurrentChat,
  };
};

export { ChangeCurrentChat };

export type CurrentChatAction = ChangeCurrentChatAction;
