import { PrivateChannelItem } from '../../interfaces';
import { ActionType } from '../action-types';
import { PrivateChannelListAction } from '../actions/PrivateChannelListActionCreator';

const initialState: PrivateChannelItem[] = [];

const PrivateChannelListReducer = (
  state: PrivateChannelItem[] = initialState,
  action: PrivateChannelListAction
): PrivateChannelItem[] => {
  switch (action.type) {
    case ActionType.AddPrivateChannels:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default PrivateChannelListReducer;
