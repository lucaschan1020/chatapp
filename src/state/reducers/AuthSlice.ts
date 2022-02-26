import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import auth from '../../apis/auth';

interface AuthState {
  IsAuth: boolean | null;
}

const getGapiAuthInstance = async () => {
  if (gapi.auth2 === undefined) {
    await new Promise((res, rej) => {
      gapi.load('client:auth2', { callback: res, onerror: rej });
    });
    await gapi.client.init({
      clientId: process.env.REACT_APP_GAPI_CLIENTID,
      scope: 'email',
    });
  }

  return gapi.auth2.getAuthInstance();
};

const SignIn = createAsyncThunk('Auth/SignIn', async (_, thunkAPI) => {
  let response: AxiosResponse | null = null;
  const gapiAuth = await getGapiAuthInstance();
  await gapiAuth.signIn();

  response = await auth.post('/login', {
    userToken: gapiAuth.currentUser.get().getAuthResponse().id_token,
  });
  gapiAuth.isSignedIn.listen((isSignedIn) => {
    if (!isSignedIn) {
      gapiAuth.signOut();
    }
    thunkAPI.dispatch(
      ChangeAuthState({
        IsAuth: isSignedIn,
      })
    );
  });

  thunkAPI.dispatch(
    ChangeAuthState({
      IsAuth: gapiAuth.isSignedIn.get() && response?.status === 200,
    })
  );
});

const SignOut = createAsyncThunk('Auth/SignOut', async (_, thunkAPI) => {
  const gapiAuth = await getGapiAuthInstance();
  await gapiAuth.signOut();

  thunkAPI.dispatch(
    ChangeAuthState({
      IsAuth: gapiAuth.isSignedIn.get(),
    })
  );
});

const UpdateAuthState = createAsyncThunk(
  'Auth/UpdateAuthState',
  async (_, thunkAPI) => {
    const auth = await getGapiAuthInstance();

    thunkAPI.dispatch(
      ChangeAuthState({
        IsAuth: auth.isSignedIn.get(),
      })
    );
  }
);

const initialState: AuthState = { IsAuth: null };

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    ChangeAuthState: (_state, action: PayloadAction<AuthState>) => {
      return { ...action.payload };
    },
  },
});

export { SignIn, SignOut, UpdateAuthState };
export const { ChangeAuthState } = AuthSlice.actions;

export default AuthSlice.reducer;
