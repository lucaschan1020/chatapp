import AvatarIcon from '@/components/AvatarIcon.component';
import Icon from '@/components/Icon.component';
import { PrivateChannelParticipantEntity } from '@/interfaces/domain';
import React from 'react';

interface ChatMessageProps {
  sender: PrivateChannelParticipantEntity | undefined;
  message: {
    channelId: string;
    bucketId: number;
    timestamp: Date;
    senderId: string;
    content: string | null;
  };
  isConsecutive: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  message,
  isConsecutive,
}) => {
  return (
    <>
      <div
        className={`group relative hover:bg-message-hover ${
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
                src={sender?.avatar}
              />
            </div>
            <div className="flex">
              <span className="cursor-pointer truncate font-primary text-base font-medium leading-[1.375rem] text-header-primary hover:underline">
                {sender?.username}
              </span>
              <span className="mt-[0.0625rem] ml-2 h-4 truncate font-primary text-xs font-medium leading-[1.375rem] text-muted">
                {message.timestamp.toISOString()}
              </span>
            </div>
          </>
        )}
        <div className="whitespace-pre-line break-words font-primary text-base font-normal leading-[1.375rem] text-normal">
          {message.content}
        </div>
        <div className="absolute right-[0.875rem] top-[-1rem] hidden rounded bg-primary shadow-elevation-stroke group-hover:flex">
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
};

export default ChatMessage;
