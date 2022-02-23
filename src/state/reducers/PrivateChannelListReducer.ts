import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrivateChannelItem } from '../../interfaces';

const initialState: PrivateChannelItem[] = [];

export const PrivateChannelListSlice = createSlice({
  name: 'PrivateChannelList',
  initialState,
  reducers: {
    AddPrivateChannels: (
      state,
      action: PayloadAction<PrivateChannelItem[]>
    ) => {
      state.push(...action.payload);
    },
  },
});

export const { AddPrivateChannels } = PrivateChannelListSlice.actions;

export default PrivateChannelListSlice.reducer;
