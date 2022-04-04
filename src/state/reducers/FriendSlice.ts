import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import friendAPI from '../../apis/friend';
import { FriendItem, FriendshipEnum } from '../../interfaces';
import omit from '../../utilities/omit';
import { AppState } from '../store';

interface FriendOperation {
  username: string;
  discriminator: number;
}

interface UpdateFriendOperation extends FriendOperation {
  friendshipStatus: FriendshipEnum;
}

const AddFriend = createAsyncThunk(
  'Friend/AddFriend',
  async (friend: FriendOperation, thunkAPI) => {
    await friendAPI.post(`/${friend.username}/${friend.discriminator}`);
  }
);

const UpdateFriend = createAsyncThunk(
  'Friend/UpdateFriend',
  async (friend: UpdateFriendOperation, thunkAPI) => {
    await friendAPI.put(`/${friend.username}/${friend.discriminator}`, {
      friendshipStatus: friend.friendshipStatus,
    });
  }
);

const DeleteFriend = createAsyncThunk(
  'Friend/DeleteFriend',
  async (friend: FriendOperation, thunkAPI) => {
    await friendAPI.delete(`/${friend.username}/${friend.discriminator}`);
  }
);

const UpdateFriendState = createAsyncThunk(
  'Friend/UpdateFriendState',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;
    if (!state.Auth.isAuth) return;
    let response: AxiosResponse | null = null;
    response = await friendAPI.get('');

    thunkAPI.dispatch(AddFriendsToList(response?.data));
  }
);

const initialState: Record<string, FriendItem> = {};

export const FriendSlice = createSlice({
  name: 'Friend',
  initialState,
  reducers: {
    AddFriendsToList: (
      state,
      action: PayloadAction<Record<string, FriendItem>>
    ) => {
      return { ...state, ...action.payload };
    },
    DeleteFriendFromList: (state, action: PayloadAction<string>) => {
      if (!state) {
        return state;
      }
      return omit(state, action.payload);
    },
  },
});
export { AddFriend, UpdateFriend, DeleteFriend, UpdateFriendState };
export const { AddFriendsToList, DeleteFriendFromList } = FriendSlice.actions;

export default FriendSlice.reducer;
