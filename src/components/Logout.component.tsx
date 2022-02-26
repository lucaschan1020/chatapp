import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { SignOut } from '../state/reducers/AuthSlice';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const signOut = async () => {
      await dispatch(SignOut());
      navigate('/');
    };
    signOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default Logout;
