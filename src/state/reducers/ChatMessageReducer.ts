import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ChatMessageItem } from '../../interfaces';
import socket from '../../socketIO';

const SendChatMessage = createAsyncThunk(
  'ChatMessage/SendChatMessage',
  (chatContent: string, thunkAPI) => {
    socket.emit('SendChatMessage', chatContent);
    thunkAPI.dispatch(
      AddChatMessage({ sender: 'Me', chatContent, timeStamp: new Date() })
    );
  }
);

const ReceiveChatMessage = createAsyncThunk(
  'ChatMessage/ReceiveChatMessage',
  (chatContent: string, thunkAPI) => {
    thunkAPI.dispatch(
      AddChatMessage({ sender: 'Them', chatContent, timeStamp: new Date() })
    );
  }
);

const initialState: ChatMessageItem[] = [];

export const ChatMessageSlice = createSlice({
  name: 'ChatMessage',
  initialState,
  reducers: {
    AddChatMessage: (state, action: PayloadAction<ChatMessageItem>) => {
      state.push(action.payload);
    },
  },
});

export { SendChatMessage, ReceiveChatMessage };
export const { AddChatMessage } = ChatMessageSlice.actions;

export default ChatMessageSlice.reducer;
