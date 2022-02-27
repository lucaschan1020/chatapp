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
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  avatar: string;
  given_name: string;
  family_name: string;
  locale: string;
}
