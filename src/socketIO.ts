import { InfiniteData } from '@tanstack/react-query';
import produce from 'immer';
import { io, Socket } from 'socket.io-client';
import getGapiAuthInstance from './apis/gapiAuth';
import { ChatMessageItem, FriendItem, PrivateChannelItem } from './interfaces';
import queryClient from './query-client';
const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN ?? '';
interface ServerToClientEvents {
  sendPrivateChannelChat: (payload: ChatMessageItem) => void;
  updateFriendshipStatus: (payload: FriendItem) => void;
  newPrivateChannelChat: (payload: PrivateChannelItem) => void;
}

interface ClientToServerEvents {}
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SERVER_DOMAIN,
  { autoConnect: false }
);

const connectSocket = async () => {
  const gapiAuth = await getGapiAuthInstance();
  if (!gapiAuth.isSignedIn.get()) {
    return;
  }

  const token = gapiAuth.currentUser.get().getAuthResponse().id_token;
  socket.auth = { token };
  socket.connect();
};

socket.on('updateFriendshipStatus', (payload) => {
  queryClient.setQueryData<Record<string, FriendItem>>(
    ['friends'],
    (oldFriends) => {
      if (!oldFriends) return { [payload.friendId.toString()]: payload };
      return produce(oldFriends, (draft) => {
        draft[payload.friendId.toString()] = payload;
      });
    }
  );
});

socket.on('newPrivateChannelChat', (payload) => {
  queryClient.setQueryData<Record<string, PrivateChannelItem>>(
    ['private-channel'],
    (oldPrivateChannels) => {
      if (!oldPrivateChannels) return { [payload.id]: payload };
      return produce(oldPrivateChannels, (draft) => {
        draft[payload.id] = payload;
      });
    }
  );
});

socket.on('sendPrivateChannelChat', (payload) => {
  queryClient.setQueryData<InfiniteData<ChatMessageItem>>(
    ['chat', payload.channelId],
    (oldChat) => {
      if (!oldChat) return oldChat;
      return produce(oldChat, (draft) => {
        const bucketPage = draft.pages.find(
          (page) => page.bucketId === payload.bucketId
        );

        if (bucketPage) {
          bucketPage.chatMessages = [
            ...bucketPage.chatMessages,
            ...payload.chatMessages,
          ];
        } else {
          draft.pages.unshift(payload);
          draft.pageParams.unshift(payload.bucketId);
        }
      });
    }
  );
});

export { connectSocket };
export default socket;
