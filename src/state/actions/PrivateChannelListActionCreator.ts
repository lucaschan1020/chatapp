import PrivateChannel from "../../interfaces/PrivateChannel";
import { ActionType } from "../action-types";

interface AddPrivateChannelListAction {
  type: ActionType.AddPrivateChannels;
  payload: PrivateChannel[];
}

const AddPrivateChannelList = (
  newPrivateChannelList: PrivateChannel[]
): AddPrivateChannelListAction => {
  return {
    type: ActionType.AddPrivateChannels,
    payload: newPrivateChannelList,
  };
};

export { AddPrivateChannelList };

export type PrivateChannelListAction = AddPrivateChannelListAction;
