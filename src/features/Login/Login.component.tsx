import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { connectSocket } from '../../lib/socket-io';
import { store } from '../../state';
import { SignIn } from '../../state/reducers/AuthSlice';
import Icon from '../../components/Icon.component';
import FullScreen from '@/components/FullScreen.component';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { from: Location };
  const from = state ? state.from.pathname : '/channels/@me';
  return (
    <FullScreen>
      <div className="relative flex h-full w-full justify-center bg-tertiary">
        <Icon.Artwork className="absolute top-0 left-0 h-full w-full" />
        <div className="z-10 flex items-center">
          <div className="mx-auto flex flex-col items-center rounded-[0.3125rem] bg-mobile-primary px-16 py-8 shadow-login">
            <label className="font-display text-2xl font-semibold leading-[1.875rem] text-header-primary">
              Welcome back!
            </label>
            <label className="font-primary text-base font-normal leading-5 text-header-secondary">
              We're so excited to see you again!
            </label>
            <button
              className="mt-5 flex h-9 w-full items-center justify-center rounded-[0.1875rem] bg-interactive-active font-primary text-base font-medium text-black hover:bg-interactive-hover"
              onClick={async () => {
                await dispatch(SignIn());
                const IsAuth = store.getState().Auth.isAuth;
                if (IsAuth) {
                  await connectSocket();
                  navigate(from, { replace: true });
                }
              }}
            >
              <Icon.Google className="mr-2 h-5 w-5" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </FullScreen>
  );
};

export default Login;
