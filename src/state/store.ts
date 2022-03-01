import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthSlice';
import ChatMessageReducer from './reducers/ChatMessageSlice';
import ViewStateReducer from './reducers/ViewStateSlice';
import CurrentUserReducer from './reducers/CurrentUserSlice';
import PrivateChannelListReducer from './reducers/PrivateChannelListSlice';

export const store = configureStore({
  reducer: {
    PrivateChannelList: PrivateChannelListReducer,
    ViewState: ViewStateReducer,
    ChatMessages: ChatMessageReducer,
    Auth: AuthReducer,
    CurrentUser: CurrentUserReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
