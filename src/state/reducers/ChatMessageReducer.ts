import { IChatMessage } from '../../interfaces';
import { ActionType } from '../action-types';
import { ChatMessageAction } from '../actions/ChatMessageActionCreator';

const initialState: IChatMessage[] = [];

const ChatMessageReducer = (
  state: IChatMessage[] = initialState,
  action: ChatMessageAction
): IChatMessage[] => {
  switch (action.type) {
    case ActionType.AddChatMessage:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default ChatMessageReducer;
