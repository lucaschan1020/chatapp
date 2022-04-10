import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import FriendView from './components/FriendView.component';
import Login from './components/Login.component';
import Logout from './components/Logout.component';
import Main from './components/Main.component';
import RequireAuth from './components/RequireAuth.component';
import { useAppDispatch } from './hooks';
import './index.css';
import { UpdateAuthState } from './state/reducers/AuthSlice';
import { UpdateCurrentUserState } from './state/reducers/CurrentUserSlice';
import ChatView from './components/ChatView.component';
import { UpdateFriendState } from './state/reducers/FriendSlice';
import { connectSocket } from './socketIO';
import { UpdatePrivateChannelListState } from './state/reducers/PrivateChannelListSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initialize = async () => {
      await connectSocket();
      await dispatch(UpdateAuthState());
      await dispatch(UpdateCurrentUserState());
      await dispatch(UpdateFriendState());
      await dispatch(UpdatePrivateChannelListState());
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <>
        <div className="flex h-screen">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Main />
                </RequireAuth>
              }
            >
              <Route
                path="/"
                element={<Navigate to="/channels/@me" replace />}
              />
              <Route
                path="channels/@me"
                element={
                  <FriendView className="bg-primary flex min-w-0 flex-1 flex-col" />
                }
              ></Route>
              <Route
                path="channels/@me/:privateChannelId"
                element={
                  <ChatView className="bg-primary flex min-w-0 flex-1 flex-col" />
                }
              ></Route>
            </Route>
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
