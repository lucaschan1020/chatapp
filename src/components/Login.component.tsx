import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { store } from '../state';
import { SignIn } from '../state/reducers/AuthSlice';
import { UpdateFriendState } from '../state/reducers/FriendSlice';
import Icon from './Icon.component';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { from: Location };
  const from = state ? state.from.pathname : '/channels/@me';
  return (
    <div className="bg-tertiary relative flex h-full w-full justify-center">
      <Icon.Artwork className="absolute top-0 left-0 h-full w-full" />
      <div className="z-10 flex items-center">
        <div className="bg-mobile-primary shadow-login mx-auto flex flex-col items-center rounded-[0.3125rem] px-16 py-8">
          <label className="font-display text-header-primary text-2xl font-semibold leading-[1.875rem]">
            Welcome back!
          </label>
          <label className="text-header-secondary font-primary text-base font-normal leading-5">
            We're so excited to see you again!
          </label>
          <button
            className="font-primary hover:bg-interactive-hover bg-interactive-active mt-5 flex h-9 w-full items-center justify-center rounded-[0.1875rem] text-base font-medium text-black"
            onClick={async () => {
              await dispatch(SignIn());
              const IsAuth = store.getState().Auth.IsAuth;
              if (IsAuth) {
                await dispatch(UpdateFriendState());
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
  );
}

export default Login;
