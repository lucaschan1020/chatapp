import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.component';
import Logout from './components/Logout.component';
import Main from './components/Main.component';
import RequireAuth from './components/RequireAuth.component';
import './index.css';

function App() {
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
