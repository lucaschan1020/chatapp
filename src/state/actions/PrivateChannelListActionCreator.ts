import { IPrivateChannel } from '../../interfaces';
import { ActionType } from '../action-types';

interface AddPrivateChannelListAction {
  type: ActionType.AddPrivateChannels;
  payload: IPrivateChannel[];
}

const AddPrivateChannelList = (
  newPrivateChannelList: IPrivateChannel[]
): AddPrivateChannelListAction => {
  return {
    type: ActionType.AddPrivateChannels,
    payload: newPrivateChannelList,
  };
};

export { AddPrivateChannelList };

export type PrivateChannelListAction = AddPrivateChannelListAction;
