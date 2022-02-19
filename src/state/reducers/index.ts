import { combineReducers } from 'redux';
import ChatMessageReducer from './ChatMessageReducer';
import CurrentChatReducer from './CurrentChatReducer';
import PrivateChannelListReducer from './PrivateChannelListReducer';

const reducers = combineReducers({
  PrivateChannelList: PrivateChannelListReducer,
  CurrentChat: CurrentChatReducer,
  ChatMessages: ChatMessageReducer,
});

export default reducers;

export type AppState = ReturnType<typeof reducers>;
