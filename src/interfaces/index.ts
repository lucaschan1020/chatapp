export interface PrivateChannelItem {
  participants: string[];
  avatarSrc?: string;
}

export interface ChatMessageItem {
  sender: string;
  chatContent: string;
  timeStamp: Date;
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
  friendshipStatus: FriendshipEnum;
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
