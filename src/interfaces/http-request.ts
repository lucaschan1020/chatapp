import { FriendshipEnum } from '.';

export interface SendPrivateChannelChatRequest {
  privateChannelId: string;
  content: string;
}

export interface PrivateChannelBucket {
  privateChannelId: string;
  bucketId: number;
}

export interface FriendRequest {
  username: string;
  discriminator: number;
}

export interface UpdateFriendOperation {
  username: string;
  discriminator: number;
  friendshipStatus: FriendshipEnum;
}

export interface CreatePrivateChannelRequest {
  participants: string[];
  privateChannelName: string;
}
