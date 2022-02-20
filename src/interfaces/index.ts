export interface IPrivateChannel {
  participants: string[];
  avatarSrc?: string;
}

export interface IChatMessage {
  sender: string;
  chatContent: string;
  timeStamp: Date;
}
