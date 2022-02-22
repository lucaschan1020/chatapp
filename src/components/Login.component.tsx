import Icon from './Icon.component';

function Login() {
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
              await new Promise((res, rej) => {
                gapi.load('client:auth2', { callback: res, onerror: rej });
              });
              await gapi.client.init({
                clientId: process.env.REACT_APP_GAPI_CLIENTID,
                scope: 'email',
              });
              const auth = gapi.auth2.getAuthInstance();
              auth.signIn();
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
