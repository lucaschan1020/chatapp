import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import friendAPI from '../../apis/friend';
import { FriendItem } from '../../interfaces';
import { AppState } from '../store';

interface AddFriendItem {
  username: string;
  discriminator: string;
}

const AddFriend = createAsyncThunk(
  'Friend/AddFriend',
  async (friend: AddFriendItem, thunkAPI) => {
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

const UpdateFriendState = createAsyncThunk(
  'Friend/UpdateFriendState',
  async (_, thunkAPI) => {
    if (!(thunkAPI.getState() as AppState).Auth.IsAuth) return;
    let response: AxiosResponse | null = null;
    response = await friendAPI.get('');

    const friends = (response?.data as FriendItem[]).reduce((acc, curr) => {
      acc[curr._id] = curr;
      return acc;
    }, {} as Record<string, FriendItem>);

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
  },
});
export { AddFriend, UpdateFriendState };
export const { AddFriendsToList } = FriendSlice.actions;

export default FriendSlice.reducer;
