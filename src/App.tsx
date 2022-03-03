import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import FriendList from './components/FriendList.component';
import Login from './components/Login.component';
import Logout from './components/Logout.component';
import Main from './components/Main.component';
import RequireAuth from './components/RequireAuth.component';
import { useAppDispatch } from './hooks';
import './index.css';
import { UpdateAuthState } from './state/reducers/AuthSlice';
import { UpdateCurrentUserState } from './state/reducers/CurrentUserSlice';
import ChatView from './components/ChatView.component';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initialize = async () => {
      await dispatch(UpdateAuthState());
      await dispatch(UpdateCurrentUserState());
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
                  <FriendList className="bg-primary flex flex-1 flex-col" />
                }
              ></Route>
              <Route
                path="channels/@me/*"
                element={
                  <ChatView className="bg-primary flex flex-1 flex-col" />
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
