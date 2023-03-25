import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ViewState {
  friendListSelectedIndex: number;
}

const initialState: ViewState = {
  friendListSelectedIndex: 0,
};

export const ViewStateSlice = createSlice({
  name: 'ViewState',
  initialState,
  reducers: {
    ChangeFriendListSelectedIndex: (state, action: PayloadAction<number>) => {
      return { ...state, friendListSelectedIndex: action.payload };
    },
  },
});

export const { ChangeFriendListSelectedIndex } = ViewStateSlice.actions;

export default ViewStateSlice.reducer;
