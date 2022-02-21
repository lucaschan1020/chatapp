import { PrivateChannelItem } from '../../interfaces';
import { ActionType } from '../action-types';
import { CurrentChatAction } from '../actions/CurrentChatActionCreator';
import { PrivateChannelListAction } from '../actions/PrivateChannelListActionCreator';

const initialState: PrivateChannelItem | null = null;

const CurrentChatReducer = (
  state: PrivateChannelItem | null = initialState,
  action: CurrentChatAction | PrivateChannelListAction
): PrivateChannelItem | null => {
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
