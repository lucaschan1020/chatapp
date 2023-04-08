import { SERVER_DOMAIN } from '@/config/env-keys';
import {
  ChatBucketEntity,
  FriendEntity,
  PrivateChannelEntity,
} from '@/interfaces/domain';
import getGapiAuthInstance from '@/lib/gapi-auth';
import queryClient from '@/lib/query-client';
import { InfiniteData } from '@tanstack/react-query';
import produce from 'immer';
import { Socket, io } from 'socket.io-client';

interface ServerToClientEvents {
  sendPrivateChannelChat: (payload: ChatBucketEntity) => void;
  updateFriendshipStatus: (payload: FriendEntity) => void;
  newPrivateChannelChat: (payload: PrivateChannelEntity) => void;
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

const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

socket.on('updateFriendshipStatus', (payload) => {
  queryClient.setQueryData<Record<string, FriendEntity>>(
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
  console.log('asd');
  queryClient.setQueryData<Record<string, PrivateChannelEntity>>(
    ['private-channels'],
    (oldPrivateChannels) => {
      if (!oldPrivateChannels) return { [payload.id]: payload };
      return produce(oldPrivateChannels, (draft) => {
        draft[payload.id] = payload;
      });
    }
  );
});

socket.on('sendPrivateChannelChat', (payload) => {
  queryClient.setQueryData<InfiniteData<ChatBucketEntity>>(
    ['chats', payload.channelId],
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

export { connectSocket, disconnectSocket };
