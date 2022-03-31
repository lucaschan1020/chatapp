import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessageItem } from '../../interfaces';
import socket from '../../socketIO';

const initialState: ChatMessageItem[] = [];
socket.on('sendPrivateChannelChat', () => {});

export const ChatMessageSlice = createSlice({
  name: 'ChatMessage',
  initialState,
  reducers: {
    AddChatMessage: (state, action: PayloadAction<ChatMessageItem>) => {
      state.push(action.payload);
    },
  },
});

export const { AddChatMessage } = ChatMessageSlice.actions;

export default ChatMessageSlice.reducer;
