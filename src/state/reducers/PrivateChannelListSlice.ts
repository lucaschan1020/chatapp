import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import privateChannelAPI from '../../apis/privateChannel';
import { PrivateChannelItem } from '../../interfaces';
import { AppState } from '../store';

interface CreatePrivateChannelRequest {
  participants: string[];
  privateChannelName: string;
}

const CreatePrivateChannel = createAsyncThunk(
  'Friend/CreatePrivateChannel',
  async (newPrivateChannel: CreatePrivateChannelRequest, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;
    if (!state.Auth.isAuth) return;
    await privateChannelAPI.post('', newPrivateChannel);
  }
);

const GetPrivateChannel = createAsyncThunk(
  'Friend/GetPrivateChannel',
  async (privateChannelId: string, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;
    if (!state.Auth.isAuth) return;
    const response = await privateChannelAPI.get<PrivateChannelItem>(
      `/private/${privateChannelId}`
    );
    thunkAPI.dispatch(
      AddPrivateChannels({ [response.data._id]: response.data })
    );
  }
);

const UpdatePrivateChannelListState = createAsyncThunk(
  'Friend/UpdatePrivateChannelListState',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;
    if (!state.Auth.isAuth) return;
    const response = await privateChannelAPI.get<
      Record<string, PrivateChannelItem>
    >('');
    thunkAPI.dispatch(AddPrivateChannels(response?.data));
  }
);

const initialState: Record<string, PrivateChannelItem> | null = null as Record<
  string,
  PrivateChannelItem
> | null;

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

export {
  CreatePrivateChannel,
  GetPrivateChannel,
  UpdatePrivateChannelListState,
};
export const { AddPrivateChannels } = PrivateChannelListSlice.actions;

export default PrivateChannelListSlice.reducer;
