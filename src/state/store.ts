import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthSlice';
import ViewStateReducer from './reducers/ViewStateSlice';

export const store = configureStore({
  reducer: {
    ViewState: ViewStateReducer,
    Auth: AuthReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
