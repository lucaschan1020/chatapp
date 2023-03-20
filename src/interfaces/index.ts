export interface PrivateChannelParticipant {
  id: string;
  avatar: string;
  username: string;
  discriminator: number;
}

export interface PrivateChannelItem {
  id: string;
  participants: Record<string, PrivateChannelParticipant>;
  privateChannelName: string;
  dateCreated: Date;
  isGroup: boolean;
}

export interface ChatMessageItem {
  channelId: string;
  chatMessages: {
    id: string;
    timestamp: Date;
    senderId: string;
    content: string | null;
    lastModified: Date;
  }[];
  bucketId: number;
}

export interface CurrentUser {
  id: string;
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
  friendId: string;
  friendshipStatus: FriendshipEnum | null;
  privateChannelId?: string;
  avatar: string;
  username: string;
  discriminator: number;
}

export enum FriendshipEnum {
  PENDING = 'PENDING',
  REQUESTED = 'REQUESTED',
  FRIEND = 'FRIEND',
  BLOCKED = 'BLOCKED',
}
