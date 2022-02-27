import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.component';
import Logout from './components/Logout.component';
import Main from './components/Main.component';
import RequireAuth from './components/RequireAuth.component';
import { useAppDispatch } from './hooks';
import './index.css';
import { UpdateCurrentUserState } from './state/reducers/CurrentUserSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initialize = async () => {
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
            />
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
