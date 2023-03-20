import { io, Socket } from 'socket.io-client';
import getGapiAuthInstance from './apis/gapiAuth';
import { ChatMessageItem, FriendItem, PrivateChannelItem } from './interfaces';
import { store } from './state';
import { AddChatMessage } from './state/reducers/ChatMessageSlice';
import { AddFriendsToList } from './state/reducers/FriendSlice';
import { AddPrivateChannels } from './state/reducers/PrivateChannelListSlice';
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
  store.dispatch(AddFriendsToList({ [payload.friendId.toString()]: payload }));
});

socket.on('newPrivateChannelChat', (payload) => {
  store.dispatch(AddPrivateChannels({ [payload.id.toString()]: payload }));
});

socket.on('sendPrivateChannelChat', (payload) => {
  const channelId = payload.channelId;
  const chatMessageState = store.getState().ChatMessages;
  if (!chatMessageState) return;
  const privateChannelChat = chatMessageState[channelId];
  if (!privateChannelChat) return;
  store.dispatch(AddChatMessage(payload));
});

export { connectSocket };
export default socket;
