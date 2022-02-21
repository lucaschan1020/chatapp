export interface PrivateChannelItem {
  participants: string[];
  avatarSrc?: string;
}

export interface ChatMessageItem {
  sender: string;
  chatContent: string;
  timeStamp: Date;
}
