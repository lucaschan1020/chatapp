import authApi from '@/api/auth.api';
import getGapiAuthInstance from '@/lib/gapi-auth';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuth: boolean | null;
}

const SignIn = createAsyncThunk('Auth/SignIn', async (_, thunkAPI) => {
  const gapiAuth = await getGapiAuthInstance();
  await gapiAuth.signIn();

  await authApi.post();

  thunkAPI.dispatch(
    ChangeAuthState({
      isAuth: gapiAuth.isSignedIn.get(),
    })
  );

  gapiAuth.isSignedIn.listen((isSignedIn) => {
    if (!isSignedIn) {
      gapiAuth.signOut();
    }
    thunkAPI.dispatch(
      ChangeAuthState({
        isAuth: isSignedIn,
      })
    );
  });
});

const SignOut = createAsyncThunk('Auth/SignOut', async (_, thunkAPI) => {
  const gapiAuth = await getGapiAuthInstance();
  await gapiAuth.signOut();

  thunkAPI.dispatch(
    ChangeAuthState({
      isAuth: gapiAuth.isSignedIn.get(),
    })
  );
});

const UpdateAuthState = createAsyncThunk(
  'Auth/UpdateAuthState',
  async (_, thunkAPI) => {
    const gapiAuth = await getGapiAuthInstance();

    thunkAPI.dispatch(
      ChangeAuthState({
        isAuth: gapiAuth.isSignedIn.get(),
      })
    );
  }
);

const initialState: AuthState = { isAuth: null };

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
