import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import privateChannelAPI from '../../apis/privateChannel';
import { PrivateChannelItem } from '../../interfaces';
import { AppState } from '../store';

const initialState: Record<string, PrivateChannelItem> | null = null as Record<
  string,
  PrivateChannelItem
> | null;

const UpdatePrivateChannelListState = createAsyncThunk(
  'Friend/UpdatePrivateChannelListState',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;
    if (!state.Auth.isAuth) return;
    let response: AxiosResponse | null = null;
    response = await privateChannelAPI.get('');
    thunkAPI.dispatch(AddPrivateChannels(response?.data));
  }
);

export const PrivateChannelListSlice = createSlice({
  name: 'PrivateChannelList',
  initialState,
  reducers: {
    AddPrivateChannels: (
      state,
      action: PayloadAction<Record<string, PrivateChannelItem>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export { UpdatePrivateChannelListState };
export const { AddPrivateChannels } = PrivateChannelListSlice.actions;

export default PrivateChannelListSlice.reducer;
