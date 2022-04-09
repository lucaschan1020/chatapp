import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import auth from '../../apis/auth';
import getGapiAuthInstance from '../../apis/gapiAuth';
import { CurrentUser } from '../../interfaces';

const UpdateCurrentUserState = createAsyncThunk(
  'CurrentUser/UpdateCurrentUserState',
  async (_, thunkAPI) => {
    const gapiAuth = await getGapiAuthInstance();
    if (!gapiAuth.isSignedIn.get()) {
      return;
    }
    const response = await auth.get<CurrentUser>('/login');

    thunkAPI.dispatch(
      ChangeCurrentUser({
        ...response?.data,
      })
    );
  }
);

const initialState: CurrentUser | null = null as CurrentUser | null;

export const CurrentUserSlicer = createSlice({
  name: 'CurrentUser',
  initialState,
  reducers: {
    ChangeCurrentUser: (_state, action: PayloadAction<CurrentUser>) => {
      return { ...action.payload };
    },
  },
});
export { UpdateCurrentUserState };
export const { ChangeCurrentUser } = CurrentUserSlicer.actions;

export default CurrentUserSlicer.reducer;
