import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.Auth.isAuth);
  const location = useLocation();

  if (isAuth === null) {
    return null;
  }

  if (isAuth === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
