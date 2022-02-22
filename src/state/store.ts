import { AnyAction, applyMiddleware, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import reducers, { AppState } from './reducers';

export const store = createStore(
  reducers,
  applyMiddleware<ThunkDispatch<AppState, undefined, AnyAction>, AppState>(
    thunk
  )
);
