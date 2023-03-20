import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import chatAPI from '../../apis/chat';
import { ChatMessageItem } from '../../interfaces';

interface SendPrivateChannelChatRequest {
  privateChannelId: string;
  content: string;
}

interface PrivateChannelBucket {
  privateChannelId: string;
  bucketId: number;
}

const SendPrivateChannelChat = createAsyncThunk(
  'ChatMessage/SendPrivateChannelChat',
  async (chat: SendPrivateChannelChatRequest, thunkAPI) => {
    const response = await chatAPI.post<ChatMessageItem>(
      `/private/${chat.privateChannelId}`,
      {
        content: chat.content,
      }
    );

    thunkAPI.dispatch(AddChatMessage(response?.data));
  }
);

const GetPrivateChannelChatMessage = createAsyncThunk(
  'ChatMessage/GetPrivateChannelChatMessage',
  async (privateChannelId: string, thunkAPI) => {
    try {
      const response = await chatAPI.get<ChatMessageItem>(
        `/private/${privateChannelId}`,
        { signal: thunkAPI.signal }
      );
      thunkAPI.dispatch(AddChatMessage(response?.data));
    } catch (err) {
      thunkAPI.dispatch(SetEmptyPrivateChannelChat(privateChannelId));
    }
  }
);

const GetBucketPrivateChannelChatMessage = createAsyncThunk(
  'ChatMessage/GetBucketPrivateChannelChatMessage',
  async ({ privateChannelId, bucketId }: PrivateChannelBucket, thunkAPI) => {
    try {
      const response = await chatAPI.get<ChatMessageItem>(
        `/private/${privateChannelId}/${bucketId}`
      );
      thunkAPI.dispatch(AddChatMessage(response?.data));
    } catch (err) {
      thunkAPI.dispatch(SetEmptyBucketChat({ privateChannelId, bucketId }));
    }
  }
);

const initialState: Record<
  string,
  Record<string, ChatMessageItem | null>
> | null = null as Record<
  string,
  Record<string, ChatMessageItem | null>
> | null;

export const ChatMessageSlice = createSlice({
  name: 'ChatMessage',
  initialState,
  reducers: {
    AddChatMessage: (state, action: PayloadAction<ChatMessageItem>) => {
      const { channelId, bucketId } = action.payload;
      if (state === null) {
        return { [channelId]: { [bucketId]: action.payload } };
      }

      const privateChannelChat = state[channelId];
      if (!privateChannelChat) {
        return {
          ...state,
          [channelId]: {
            [bucketId]: action.payload,
          },
        };
      }

      const bucketChat = privateChannelChat[bucketId];
      if (!bucketChat) {
        return {
          ...state,
          [channelId]: { ...privateChannelChat, [bucketId]: action.payload },
        };
      }

      return {
        ...state,
        [channelId]: {
          ...privateChannelChat,
          [bucketId]: {
            ...bucketChat,
            chatMessages: [
              ...bucketChat.chatMessages,
              ...action.payload.chatMessages,
            ],
          },
        },
      };
    },
    SetEmptyPrivateChannelChat: (state, action: PayloadAction<string>) => {
      if (state === null) {
        return { [action.payload]: {} };
      }

      const privateChannelChat = state[action.payload];
      if (privateChannelChat && Object.keys(privateChannelChat).length === 0) {
        return state;
      }

      return { ...state, [action.payload]: {} };
    },
    SetEmptyBucketChat: (
      state,
      action: PayloadAction<PrivateChannelBucket>
    ) => {
      const { privateChannelId, bucketId } = action.payload;
      if (state === null) {
        return { [privateChannelId]: { [bucketId]: null } };
      }

      const privateChannelChat = state[privateChannelId];
      if (!privateChannelChat) {
        return { ...state, [privateChannelId]: { [bucketId]: null } };
      }

      const bucketChat = privateChannelChat[bucketId];
      if (!bucketChat) {
        return {
          ...state,
          [privateChannelId]: { ...privateChannelChat, [bucketId]: null },
        };
      }

      return { ...state };
    },
  },
});

export {
  SendPrivateChannelChat,
  GetPrivateChannelChatMessage,
  GetBucketPrivateChannelChatMessage,
};
export const {
  AddChatMessage,
  SetEmptyPrivateChannelChat,
  SetEmptyBucketChat,
} = ChatMessageSlice.actions;

export default ChatMessageSlice.reducer;
