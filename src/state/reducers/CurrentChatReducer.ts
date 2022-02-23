import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrivateChannelItem } from '../../interfaces';
const AddPrivateChannels = createAction<PrivateChannelItem[]>(
  'PrivateChannelList/AddPrivateChannels'
);

const initialState: PrivateChannelItem | null =
  null as PrivateChannelItem | null;

export const CurrentChatSlice = createSlice({
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

export const { ChangeCurrentChat } = CurrentChatSlice.actions;

export default CurrentChatSlice.reducer;
