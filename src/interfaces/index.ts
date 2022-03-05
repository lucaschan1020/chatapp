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
  email_verified: boolean;
  name: string;
  avatar: string;
  given_name: string;
  family_name: string;
  locale: string;
  username: string;
  discriminator: number;
}

export interface FriendItem {
  _id: string;
  friendship_status: FriendshipEnum;
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
