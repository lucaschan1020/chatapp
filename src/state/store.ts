import { configureStore } from '@reduxjs/toolkit';
import ChatMessageReducer from './reducers/ChatMessageReducer';
import CurrentChatReducer from './reducers/CurrentChatReducer';
import PrivateChannelListReducer from './reducers/PrivateChannelListReducer';

export const store = configureStore({
  reducer: {
    PrivateChannelList: PrivateChannelListReducer,
    CurrentChat: CurrentChatReducer,
    ChatMessages: ChatMessageReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
