import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { UpdateAuthState } from '../state/reducers/AuthSlice';

interface RequireAuthProps {
  children: JSX.Element;
}

function RequireAuth({ children }: RequireAuthProps) {
  const isAuth = useAppSelector((state) => state.Auth.IsAuth);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialize = async () => {
      if (isAuth === null) {
        await dispatch(UpdateAuthState());
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuth === null) {
    return null;
  }

  if (isAuth === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
