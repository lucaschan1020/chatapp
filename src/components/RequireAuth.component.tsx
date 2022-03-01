import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';

interface RequireAuthProps {
  children: JSX.Element;
}

function RequireAuth({ children }: RequireAuthProps) {
  const isAuth = useAppSelector((state) => state.Auth.IsAuth);
  const location = useLocation();

  if (isAuth === null) {
    return null;
  }

  if (isAuth === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
