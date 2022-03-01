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
    ChangeCurrentChat: (state, action: PayloadAction<PrivateChannelItem>) => {
      return { ...state, CurrentChat: { ...action.payload } };
    },
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

export const { ChangeCurrentChat, ChangeFriendListSelectedIndex } =
  ViewStateSlice.actions;

export default ViewStateSlice.reducer;
