import { useAppDispatch } from '@/hooks/redux';
import { disconnectSocket } from '@/lib/socket-io';
import { SignOut } from '@/state/reducers/AuthSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const signOut = async () => {
      await dispatch(SignOut());
      disconnectSocket();
      navigate('/');
    };
    signOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Logout;
