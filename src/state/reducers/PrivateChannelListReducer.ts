import PrivateChannel from "../../interfaces/PrivateChannel";
import { ActionType } from "../action-types";
import { PrivateChannelListAction } from "../actions/PrivateChannelListActionCreator";

const initialState: PrivateChannel[] = [];

const PrivateChannelListReducer = (state: PrivateChannel[] = initialState, action: PrivateChannelListAction): PrivateChannel[] => {
    switch (action.type) {
        case ActionType.AddPrivateChannels:
            return [...state, ...action.payload]
        default:
            return state
    }
}

export default PrivateChannelListReducer;