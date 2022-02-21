import { ChatMessageItem } from '../../interfaces';
import { ActionType } from '../action-types';
import { ChatMessageAction } from '../actions/ChatMessageActionCreator';

const initialState: ChatMessageItem[] = [];

const ChatMessageReducer = (
  state: ChatMessageItem[] = initialState,
  action: ChatMessageAction
): ChatMessageItem[] => {
  switch (action.type) {
    case ActionType.AddChatMessage:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default ChatMessageReducer;
