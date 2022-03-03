import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SendChatMessage } from '../state/reducers/ChatMessageSlice';
import AvatarIcon from './AvatarIcon.component';
import ChatMessage from './ChatMessage.component';
import Icon from './Icon.component';

interface ChatViewProps {
  className?: string;
}

function ChatView({ className = '' }: ChatViewProps) {
  const [viewMemberList, setViewMemberList] = useState(false);
  const [draftMessage, setDraftMessage] = useState('');
  const textAreaMessage = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaMessage.current !== null) {
      textAreaMessage.current.style.height = '0px';
      const scrollHeight = textAreaMessage.current.scrollHeight;
      textAreaMessage.current.style.height = scrollHeight + 'px';
    }
  }, [draftMessage]);

  const CurrentChat = useAppSelector((state) => state.ViewState.CurrentChat);
  const ChatMessages = useAppSelector((state) => state.ChatMessages);
  const dispatch = useAppDispatch();

  return (
    <div className={className}>
      <div className="shadow-elevation-low z-[2] flex h-12 flex-none items-center px-2">
        <div className="text-muted mx-2">
          <Icon.Alias />
        </div>
        <div className="font-display text-header-primary text-base font-semibold leading-5">
          {CurrentChat?.participants.join(', ')}
        </div>
        <div className="ml-auto flex">
          <div className="text-interactive mx-2 cursor-pointer">
            <Icon.AudioCall />
          </div>
          <div className="text-interactive mx-2 cursor-pointer">
            <Icon.VideoCall />
          </div>
          <div className="text-interactive mx-2 cursor-pointer">
            <Icon.Pin />
          </div>
          <div className="text-interactive mx-2 cursor-pointer">
            <Icon.AddMember />
          </div>
          {CurrentChat && CurrentChat?.participants.length > 1 && (
            <div
              className="text-interactive mx-2 cursor-pointer"
              onClick={() => setViewMemberList(!viewMemberList)}
            >
              <Icon.Members />
            </div>
          )}
          <div className="text-normal mx-2 flex">
            <input
              className="bg-tertiary font-primary placeholder:text-muted placeholder-not-shown:w-[13.25rem] h-6 w-[7.25rem] flex-1 rounded-l pl-[0.375rem] text-sm font-medium leading-5 outline-none transition-[width] duration-[250ms] focus:w-[13.25rem]"
              placeholder="Search"
              type="text"
            />
            <div className="bg-tertiary text-muted flex h-6 w-7 cursor-text items-center justify-center rounded-r px-[0.125rem]">
              <Icon.MagnifyingGlass />
            </div>
          </div>
          <div className="text-interactive mx-2 cursor-pointer">
            <Icon.DMInbox />
          </div>
          <div className="text-interactive mx-2 cursor-pointer">
            <Icon.Help />
          </div>
        </div>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex flex-1 flex-col">
          <div className="scrollbar-4 -webkit-scrollbar-thumb:min-h-[2.5rem] scrollbar-thumb-rounded-lg -webkit-scrollbar-thumb:bg-tertiary scrollbar-track scrollbar-thumb-border flex flex-1 flex-col-reverse overflow-y-scroll">
            <div className="min-h-[1.875rem]"></div>
            {ChatMessages.map((_chatMessage, index, ChatMessages) => {
              const currentChatMessage =
                ChatMessages[ChatMessages.length - 1 - index];
              const previousChatMessage =
                ChatMessages[ChatMessages.length - 2 - index] ?? null;
              const isConsecutive =
                previousChatMessage !== null &&
                previousChatMessage?.sender === currentChatMessage.sender;
              return (
                <ChatMessage
                  key={index.toString()}
                  message={currentChatMessage}
                  isConsecutive={isConsecutive}
                />
              );
            })}
          </div>
          <div className="relative mb-6 mt-[-0.5rem] flex flex-none px-4">
            <span className="bg-channeltextarea-background flex-none rounded-l-lg px-4 py-[0.625rem]">
              <div className="text-interactive">
                <Icon.AttachPlus className="cursor-pointer" />
              </div>
            </span>
            <textarea
              className="bg-channeltextarea-background font-primary text-normal scrollbar-3 scrollbar-thumb-rounded-lg -webkit-scrollbar-thumb:bg-[rgba(24,25,28,.6)] scrollbar-thumb-border max-h-[29.375rem] min-h-[2.75rem] flex-1 resize-none overflow-y-auto rounded-r-lg py-[0.625rem] outline-none"
              rows={1}
              ref={textAreaMessage}
              value={draftMessage}
              onChange={(e) => {
                setDraftMessage((e.target as HTMLTextAreaElement).value);
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') {
                  return;
                }
                if (e.shiftKey) {
                  return;
                }
                e.preventDefault();
                if (!draftMessage.trim()) {
                  return;
                }
                dispatch(
                  SendChatMessage(
                    (e.target as HTMLTextAreaElement).value.trim()
                  )
                );
                setDraftMessage('');
              }}
            ></textarea>
            <div className="absolute right-5 top-1 flex flex-none items-center">
              <div className="text-interactive mx-1 cursor-pointer p-1">
                <Icon.Gift />
              </div>
              <div className="text-interactive mx-1 cursor-pointer p-1">
                <Icon.GIF />
              </div>
              <div className="text-interactive mx-1 cursor-pointer p-1">
                <Icon.Sticker />
              </div>
            </div>
          </div>
        </div>
        {CurrentChat && CurrentChat?.participants.length > 1 && viewMemberList && (
          <div className="bg-secondary scrollbar-2 -webkit-scrollbar-thumb:min-h-[2.5rem] scrollbar-thumb-rounded -webkit-scrollbar-thumb:bg-transparent scrollbar-thumb-border hover-scrollbar-thumb flex w-60 flex-none flex-col overflow-y-scroll">
            <label className="font-display text-channel-default pt-6 pr-2 pl-4 text-xs font-semibold uppercase tracking-[0.015625rem]">
              Members—{CurrentChat?.participants.length}
            </label>

            {CurrentChat?.participants.map(
              (participant: string, index: any) => (
                <div
                  key={index}
                  className="group text-interactive hover:bg-modifier-hover ml-2 flex h-11 flex-none cursor-pointer items-center rounded-[0.25rem] px-2 py-[0.0625rem]"
                >
                  <AvatarIcon />
                  <label className="font-primary text-channel-default group-hover:text-interactive-hover ml-3 mt-[0.0625rem] cursor-pointer truncate text-base font-medium leading-5">
                    {participant}
                  </label>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatView;
