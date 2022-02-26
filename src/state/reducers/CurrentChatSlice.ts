import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrivateChannelItem } from '../../interfaces';
import { AddPrivateChannels } from './PrivateChannelListSlice';

const initialState: PrivateChannelItem | null =
  null as PrivateChannelItem | null;

export const CurrentChatSlicer = createSlice({
  name: 'CurrentChat',
  initialState,
  reducers: {
    ChangeCurrentChat: (_state, action: PayloadAction<PrivateChannelItem>) => {
      return { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AddPrivateChannels, (state, action) => {
      if (state) {
        return;
      }
      return { ...action.payload[0] };
    });
  },
});

export const { ChangeCurrentChat } = CurrentChatSlicer.actions;

export default CurrentChatSlicer.reducer;
