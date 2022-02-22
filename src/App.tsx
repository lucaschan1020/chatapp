import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.component';
import Main from './components/Main.component';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <>
        <div className="flex h-screen">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Main />}></Route>
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
