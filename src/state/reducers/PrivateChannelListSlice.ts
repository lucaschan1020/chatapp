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
    const response = await privateChannelAPI.post<PrivateChannelItem>(
      '',
      newPrivateChannel
    );

    thunkAPI.dispatch(
      AddPrivateChannels({ [response.data.id]: response.data })
    );
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
      AddPrivateChannels({ [response.data.id]: response.data })
    );
  }
);

const InitializePrivateChannelListState = createAsyncThunk(
  'Friend/InitializePrivateChannelListState',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;
    if (!state.Auth.isAuth) return;
    const response = await privateChannelAPI.get<
      Record<string, PrivateChannelItem>
    >('');
    thunkAPI.dispatch(InitializePrivateChannelList(response?.data));
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
    InitializePrivateChannelList: (
      _state,
      action: PayloadAction<Record<string, PrivateChannelItem>>
    ) => {
      return { ...action.payload };
    },
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
  InitializePrivateChannelListState,
};
export const { InitializePrivateChannelList, AddPrivateChannels } =
  PrivateChannelListSlice.actions;

export default PrivateChannelListSlice.reducer;
