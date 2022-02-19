import { ActionType } from '../action-types';
import { ChatMessageAction } from '../actions/ChatMessageActionCreator';

const initialState: string[] = [];

const ChatMessageReducer = (
  state: string[] = initialState,
  action: ChatMessageAction
): string[] => {
  switch (action.type) {
    case ActionType.AddChatMessage:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default ChatMessageReducer;
