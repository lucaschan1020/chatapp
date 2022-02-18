import PrivateChannel from "../../interfaces/PrivateChannel";
import { ActionType } from "../action-types";

const initialState: PrivateChannel | null = null;

const CurrentChatReducer = (
  state: PrivateChannel | null = initialState,
  action: any
): PrivateChannel | null => {
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
