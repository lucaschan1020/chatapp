import ChatViewContainer from '@/features/Chat/components/ChatViewContainer.component';
import RequireAuth from '@/components/RequireAuth.component';
import FriendViewContainer from '@/features/Friends/components/FriendViewContainer.component';
import Login from '@/features/Login/Login.component';
import Logout from '@/features/Logout/Logout.component';
import Main from '@/features/Main/components/Main.component';
import { Navigate, Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <>
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
          <Route path="/" element={<Navigate to="/channels/@me" replace />} />
          <Route path="channels/@me" element={<FriendViewContainer />}></Route>
          <Route
            path="channels/@me/:privateChannelId"
            element={<ChatViewContainer />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
