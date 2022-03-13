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
  friendship_status: FriendshipEnum;
}

const AddFriend = createAsyncThunk(
  'Friend/AddFriend',
  async (friend: FriendOperation, thunkAPI) => {
    let response: AxiosResponse | null = null;
    response = await friendAPI.post(
      `/${friend.username}/${friend.discriminator}`
    );

    thunkAPI.dispatch(
      AddFriendsToList({
        [response?.data._id]: response?.data,
      })
    );
  }
);

const UpdateFriend = createAsyncThunk(
  'Friend/UpdateFriend',
  async (friend: UpdateFriendOperation, thunkAPI) => {
    let response: AxiosResponse | null = null;
    response = await friendAPI.put(
      `/${friend.username}/${friend.discriminator}`,
      { friendship_status: friend.friendship_status }
    );

    thunkAPI.dispatch(
      AddFriendsToList({
        [response?.data._id]: response?.data,
      })
    );
  }
);

const DeleteFriend = createAsyncThunk(
  'Friend/DeleteFriend',
  async (friend: FriendOperation, thunkAPI) => {
    let response: AxiosResponse | null = null;
    response = await friendAPI.delete(
      `/${friend.username}/${friend.discriminator}`
    );

    thunkAPI.dispatch(DeleteFriendFromList(response?.data._id));
  }
);

const UpdateFriendState = createAsyncThunk(
  'Friend/UpdateFriendState',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;
    if (!state.Auth.IsAuth) return;
    let response: AxiosResponse | null = null;
    response = await friendAPI.get('');
    const friends = {} as Record<string, FriendItem>;
    (response?.data as FriendItem[]).forEach((friend) => {
      friends[friend._id] = friend;
    });

    thunkAPI.dispatch(AddFriendsToList(friends));
  }
);

const initialState: Record<string, FriendItem> | null = null as Record<
  string,
  FriendItem
> | null;

export const FriendSlice = createSlice({
  name: 'Friend',
  initialState,
  reducers: {
    AddFriendsToList: (
      _state,
      action: PayloadAction<Record<string, FriendItem>>
    ) => {
      return { ...action.payload };
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
