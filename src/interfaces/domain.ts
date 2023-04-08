export interface UserEntity {
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

export interface FriendEntity {
  friendId: string;
  friendshipStatus: FriendshipEnum | null;
  privateChannelId?: string;
  avatar: string;
  username: string;
  discriminator: number;
}

export interface PrivateChannelParticipantEntity {
  id: string;
  avatar: string;
  username: string;
  discriminator: number;
}

export interface PrivateChannelEntity {
  id: string;
  participants: Record<string, PrivateChannelParticipantEntity>;
  privateChannelName: string;
  dateCreated: Date;
  isGroup: boolean;
}

export interface ChatEntity {
  id: string;
  timestamp: Date;
  senderId: string;
  content: string | null;
  lastModified: Date;
}

export interface ChatBucketEntity {
  channelId: string;
  chatMessages: ChatEntity[];
  bucketId: number;
}

export enum FriendshipEnum {
  PENDING = 'PENDING',
  REQUESTED = 'REQUESTED',
  FRIEND = 'FRIEND',
  BLOCKED = 'BLOCKED',
}
