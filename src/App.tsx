import { useAppDispatch } from '@/hooks/redux';
import { connectSocket } from '@/lib/socket-io';
import { AuthSlice } from '@/state';
import { useEffect } from 'react';
import './index.css';
import AppRoutes from '@/routes';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initialize = async () => {
      await connectSocket();
      await dispatch(AuthSlice.UpdateAuthState());
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AppRoutes />;
};

export default App;
