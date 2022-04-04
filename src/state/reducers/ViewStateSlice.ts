import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrivateChannelItem } from '../../interfaces';
import { AddPrivateChannels } from './PrivateChannelListSlice';

interface ViewState {
  CurrentChat: PrivateChannelItem | null;
  FriendListSelectedIndex: number;
}

const initialState: ViewState = {
  CurrentChat: null as PrivateChannelItem | null,
  FriendListSelectedIndex: 0,
};

export const ViewStateSlice = createSlice({
  name: 'ViewState',
  initialState,
  reducers: {
    ChangeFriendListSelectedIndex: (state, action: PayloadAction<number>) => {
      return { ...state, FriendListSelectedIndex: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AddPrivateChannels, (state, action) => {
      if (state.CurrentChat) {
        return;
      }
      return { ...state, CurrentChat: { ...action.payload[0] } };
    });
  },
});

export const { ChangeFriendListSelectedIndex } = ViewStateSlice.actions;

export default ViewStateSlice.reducer;
