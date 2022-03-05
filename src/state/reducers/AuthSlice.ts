import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import authAPI from '../../apis/auth';
import getGapiAuthInstance from '../../apis/gapiAuth';
import { ChangeCurrentUser } from './CurrentUserSlice';

interface AuthState {
  IsAuth: boolean | null;
}

const SignIn = createAsyncThunk('Auth/SignIn', async (_, thunkAPI) => {
  let response: AxiosResponse | null = null;
  const gapiAuth = await getGapiAuthInstance();
  await gapiAuth.signIn();

  response = await authAPI.post('/login', {
    userToken: gapiAuth.currentUser.get().getAuthResponse().id_token,
  });

  thunkAPI.dispatch(
    ChangeAuthState({
      IsAuth:
        gapiAuth.isSignedIn.get() &&
        (response?.status === 200 || response?.status === 201),
    })
  );

  thunkAPI.dispatch(
    ChangeCurrentUser({
      ...response?.data,
    })
  );

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
    const gapiAuth = await getGapiAuthInstance();

    thunkAPI.dispatch(
      ChangeAuthState({
        IsAuth: gapiAuth.isSignedIn.get(),
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
