import React from 'react';
import { useAppSelector } from '../hooks';
import AvatarIcon from './AvatarIcon.component';
import Icon from './Icon.component';

interface ChatMessageProps {
  message: {
    channelId: string;
    bucketId: number;
    timestamp: Date;
    senderId: string;
    content: string | null;
  };
  isConsecutive: boolean;
}

function ChatMessage({ message, isConsecutive }: ChatMessageProps) {
  const sender = useAppSelector((state) => {
    const currentUser = state.CurrentUser;
    if (!currentUser) return null;
    if (message.senderId !== currentUser._id) {
      const friend = state.Friends[message.senderId];
      if (!friend) return null;
      return friend;
    }
    return currentUser;
  });
  return (
    <>
      <div
        className={`hover:bg-message-hover group relative ${
          !isConsecutive
            ? 'mt-[1.0625rem] min-h-[2.75rem] '
            : 'min-h-[1.375rem]'
        }flex flex-none flex-col py-[0.125rem] pl-[4.5rem]`}
      >
        {!isConsecutive && (
          <>
            <div className="absolute left-4">
              <AvatarIcon
                className="mt-[0.125rem] cursor-pointer"
                height="h-10"
                width="w-10"
                src={sender !== null ? sender.avatar : undefined}
              />
            </div>
            <div className="flex">
              <span className="font-primary text-header-primary cursor-pointer text-base font-medium leading-[1.375rem] hover:underline">
                {sender?.username}
              </span>
              <span className="font-primary text-muted mt-[0.0625rem] ml-2 h-4 text-xs font-medium leading-[1.375rem]">
                {message.timestamp.toISOString()}
              </span>
            </div>
          </>
        )}
        <div className="font-primary text-normal whitespace-pre-line text-base font-normal leading-[1.375rem]">
          {message.content}
        </div>
        <div className="shadow-elevation-stroke bg-primary absolute right-[0.875rem] top-[-1rem] hidden rounded group-hover:flex">
          <button className="text-interactive p-[0.375rem]">
            <Icon.AddReaction className="h-5 w-5" />
          </button>
          <button className="text-interactive p-[0.375rem]">
            <Icon.Reply className="h-5 w-5" />
          </button>
          <button className="text-interactive p-[0.375rem]">
            <Icon.More className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* {!isConsecutive && (
        <ChatDivider content={message.timeStamp.toISOString()} />
      )} */}
    </>
  );
}

export default ChatMessage;
