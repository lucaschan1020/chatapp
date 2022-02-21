import { PrivateChannelItem } from '../../interfaces';
import { ActionType } from '../action-types';

interface AddPrivateChannelListAction {
  type: ActionType.AddPrivateChannels;
  payload: PrivateChannelItem[];
}

const AddPrivateChannelList = (
  newPrivateChannelList: PrivateChannelItem[]
): AddPrivateChannelListAction => {
  return {
    type: ActionType.AddPrivateChannels,
    payload: newPrivateChannelList,
  };
};

export { AddPrivateChannelList };

export type PrivateChannelListAction = AddPrivateChannelListAction;
