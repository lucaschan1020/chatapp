export interface PrivateChannelItem {
  _id: string;
  participants: {
    avatar: string;
    username: string;
    discriminator: number;
  }[];
  privateChannelName: string;
  dateCreated: Date;
  isGroup: boolean;
}

export interface ChatMessageItem {
  channelId: string;
  bucketId: number;
  chatMessages: {
    _id: string;
    timestamp: Date;
    senderId: string;
    content: string | null;
  }[];
}

export interface CurrentUser {
  _id: string;
  sub: string;
  email: string;
  emailVerified: boolean;
  name: string;
  avatar: string;
  givenName: string;
  familyName: string;
  locale: string;
  username: string;
  discriminator: number;
}

export interface FriendItem {
  _id: string;
  friendshipStatus?: FriendshipEnum | null;
  avatar: string;
  username: string;
  discriminator: number;
}

export enum FriendshipEnum {
  Pending,
  Requested,
  Friend,
  Blocked,
}
