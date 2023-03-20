import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import friendAPI from '../../apis/friend';
import { FriendItem, FriendshipEnum } from '../../interfaces';
import omit from '../../utilities/omit';
import { AppState } from '../store';

interface FriendRequest {
  username: string;
  discriminator: number;
}

interface UpdateFriendOperation extends FriendRequest {
  friendshipStatus: FriendshipEnum;
}

const UpdateFriend = createAsyncThunk(
  'Friend/UpdateFriend',
  async (friend: UpdateFriendOperation, thunkAPI) => {
    const response = await friendAPI.put<FriendItem>(
      `/${friend.username}/${friend.discriminator}`,
      {
        friendshipStatus: friend.friendshipStatus,
      }
    );

    thunkAPI.dispatch(
      AddFriendsToList({ [response?.data.friendId]: response?.data })
    );
  }
);

const DeleteFriend = createAsyncThunk(
  'Friend/DeleteFriend',
  async (friend: FriendRequest, thunkAPI) => {
    const response = await friendAPI.delete<FriendItem>(
      `/${friend.username}/${friend.discriminator}`
    );

    thunkAPI.dispatch(
      AddFriendsToList({ [response?.data.friendId]: response?.data })
    );
  }
);

const InitializeFriendState = createAsyncThunk(
  'Friend/InitializeFriendState',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;
    if (!state.Auth.isAuth) return;
    const response = await friendAPI.get<Record<string, FriendItem>>('');

    thunkAPI.dispatch(InitializeFriendList(response?.data));
  }
);

const initialState: Record<string, FriendItem> = {};

export const FriendSlice = createSlice({
  name: 'Friend',
  initialState,
  reducers: {
    InitializeFriendList: (
      _state,
      action: PayloadAction<Record<string, FriendItem>>
    ) => {
      return { ...action.payload };
    },
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
export { UpdateFriend, DeleteFriend, InitializeFriendState };
export const { InitializeFriendList, AddFriendsToList, DeleteFriendFromList } =
  FriendSlice.actions;

export default FriendSlice.reducer;
