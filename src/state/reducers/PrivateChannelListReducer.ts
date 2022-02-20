import { IPrivateChannel } from '../../interfaces';
import { ActionType } from '../action-types';
import { PrivateChannelListAction } from '../actions/PrivateChannelListActionCreator';

const initialState: IPrivateChannel[] = [];

const PrivateChannelListReducer = (
  state: IPrivateChannel[] = initialState,
  action: PrivateChannelListAction
): IPrivateChannel[] => {
  switch (action.type) {
    case ActionType.AddPrivateChannels:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default PrivateChannelListReducer;
