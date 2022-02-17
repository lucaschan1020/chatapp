import { combineReducers } from 'redux';
import CurrentChatReducer from './CurrentChatReducer';
import PrivateChannelListReducer from './PrivateChannelListReducer';

const reducers = combineReducers({
  PrivateChannelList: PrivateChannelListReducer,
  CurrentChat: CurrentChatReducer
});

export default reducers;

export type AppState = ReturnType<typeof reducers>;