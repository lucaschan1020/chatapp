import { configureStore } from '@reduxjs/toolkit';
import ChatMessageReducer from './reducers/ChatMessageSlice';
import CurrentChatReducer from './reducers/CurrentChatSlice';
import PrivateChannelListReducer from './reducers/PrivateChannelListSlice';

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
