import React from 'react';
import { ChatMessageItem } from '../interfaces';
import AvatarIcon from './AvatarIcon.component';
import ChatDivider from './ChatDivider';
import Icon from './Icon.component';

interface ChatMessageProps {
  key: string;
  message: ChatMessageItem;
  isConsecutive: boolean;
}

function ChatMessage({ key, message, isConsecutive }: ChatMessageProps) {
  return (
    <React.Fragment key={key}>
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
              />
            </div>
            <div className="flex">
              <span className="font-primary text-header-primary cursor-pointer text-base font-medium leading-[1.375rem] hover:underline">
                {message.sender}
              </span>
              <span className="font-primary text-muted mt-[0.0625rem] ml-2 h-4 text-xs font-medium leading-[1.375rem]">
                {message.timeStamp.toISOString()}
              </span>
            </div>
          </>
        )}
        <div className="font-primary text-normal whitespace-pre-line text-base font-normal leading-[1.375rem]">
          {message.chatContent}
        </div>
        <div className="shadow-elevation-stroke bg-primary absolute right-[0.875rem] top-[-1rem] hidden rounded group-hover:flex">
          <button className="text-interactive-normal hover:text-interactive-hover p-[0.375rem]">
            <Icon.AddReaction className="h-5 w-5" />
          </button>
          <button className="text-interactive-normal hover:text-interactive-hover p-[0.375rem]">
            <Icon.Reply className="h-5 w-5" />
          </button>
          <button className="text-interactive-normal hover:text-interactive-hover p-[0.375rem]">
            <Icon.More className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* {!isConsecutive && (
        <ChatDivider content={message.timeStamp.toISOString()} />
      )} */}
    </React.Fragment>
  );
}

export default ChatMessage;
