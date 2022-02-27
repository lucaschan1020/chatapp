import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthSlice';
import ChatMessageReducer from './reducers/ChatMessageSlice';
import CurrentChatReducer from './reducers/CurrentChatSlice';
import CurrentUserReducer from './reducers/CurrentUserSlice';
import PrivateChannelListReducer from './reducers/PrivateChannelListSlice';

export const store = configureStore({
  reducer: {
    PrivateChannelList: PrivateChannelListReducer,
    CurrentChat: CurrentChatReducer,
    ChatMessages: ChatMessageReducer,
    Auth: AuthReducer,
    CurrentUser: CurrentUserReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
