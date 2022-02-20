import { IPrivateChannel } from '../../interfaces';
import { ActionType } from '../action-types';
import { CurrentChatAction } from '../actions/CurrentChatActionCreator';
import { PrivateChannelListAction } from '../actions/PrivateChannelListActionCreator';

const initialState: IPrivateChannel | null = null;

const CurrentChatReducer = (
  state: IPrivateChannel | null = initialState,
  action: CurrentChatAction | PrivateChannelListAction
): IPrivateChannel | null => {
  switch (action.type) {
    case ActionType.ChangeCurrentChat:
      return action.payload;
    case ActionType.AddPrivateChannels:
      if (state) {
        return state;
      }
      return action.payload[0];
    default:
      return state;
  }
};

export default CurrentChatReducer;
