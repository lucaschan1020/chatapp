import AvatarIcon from '@/components/AvatarIcon.component';
import Icon from '@/components/Icon.component';
import ChatFriendIntro from '@/features/Chat/components/ChatFriendIntro.component';
import ChatGroupIntro from '@/features/Chat/components/ChatGroupIntro.component';
import ChatMessage from '@/features/Chat/components/ChatMessage.component';
import ChatSecondaryView from '@/features/Chat/components/ChatSecondaryView.component';
import useCreateChat from '@/features/Chat/hooks/use-create-chat.hook';
import useGetInfiniteChat from '@/features/Chat/hooks/use-get-infinite-chat.hook';
import useUser from '@/hooks/use-user.hook';
import { PrivateChannelEntity } from '@/interfaces/domain';
import { parseJSON } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

interface ChatMainViewProps {
  privateChannel: PrivateChannelEntity;
  viewMemberList: boolean;
}

const ChatMainView: React.FC<ChatMainViewProps> = ({
  privateChannel,
  viewMemberList,
}) => {
  const friend = !privateChannel.isGroup
    ? Object.values(privateChannel.participants)[0]
    : null;

  const [draftMessage, setDraftMessage] = useState('');
  const textAreaMessage = useRef<HTMLTextAreaElement>(null);

  const { data: user } = useUser();

  const {
    data: currentChat,
    fetchNextPage: fetchNextChat,
    hasNextPage: hasNextChat,
  } = useGetInfiniteChat(privateChannel.id);

  const { mutate: sendMessage } = useCreateChat();

  const newBucketDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!newBucketDiv.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasNextChat) {
            fetchNextChat();
          }
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '10px',
      }
    );
    observer.observe(newBucketDiv.current);

    return () => {
      if (newBucketDiv.current !== null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(newBucketDiv.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newBucketDiv, currentChat]);

  useEffect(() => {
    if (textAreaMessage.current !== null) {
      textAreaMessage.current.style.height = '0px';
      const scrollHeight = textAreaMessage.current.scrollHeight;
      textAreaMessage.current.style.height = scrollHeight + 'px';
    }
  }, [draftMessage]);

  useEffect(() => {
    setDraftMessage('');
  }, [privateChannel.id]);

  return (
    <>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="scrollbar-4 scrollbar-thumb-rounded-lg scrollbar-track scrollbar-thumb-border flex flex-1 flex-col-reverse overflow-y-scroll -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:bg-tertiary">
          <div className="min-h-[1.875rem]"></div>
          {currentChat &&
            currentChat.pages.flatMap((page) =>
              page.chatMessages
                .map(({ id, timestamp, senderId, content }) => ({
                  channelId: page.channelId,
                  bucketId: page.bucketId,
                  id,
                  timestamp: parseJSON(timestamp),
                  senderId,
                  content,
                }))
                .map((_chatMessage, index, chatMessages) => {
                  // reverse map
                  const currentChatMessage = chatMessages.at(-1 - index)!;
                  const previousChatMessage =
                    chatMessages.at(-2 - index) ?? null;
                  const isConsecutive =
                    previousChatMessage?.senderId ===
                    currentChatMessage.senderId;

                  const sender =
                    user?.id === currentChatMessage.senderId
                      ? {
                          id: user?.id,
                          avatar: user?.avatar,
                          username: user?.username,
                          discriminator: user?.discriminator,
                        }
                      : privateChannel?.participants[
                          currentChatMessage.senderId
                        ];
                  return (
                    <ChatMessage
                      sender={sender}
                      key={currentChatMessage.id}
                      message={currentChatMessage}
                      isConsecutive={isConsecutive}
                    />
                  );
                })
            )}
          <div ref={newBucketDiv}></div>

          <div className="m-4 flex flex-col">
            <AvatarIcon src={friend?.avatar} width="w-20" height="h-20" />
            <label className="my-2 font-display text-[2rem] font-bold leading-10 text-header-primary">
              {friend?.username ?? privateChannel.privateChannelName}
            </label>
            {friend !== null ? (
              <ChatFriendIntro friend={friend} />
            ) : (
              <ChatGroupIntro name={privateChannel.privateChannelName} />
            )}
          </div>
        </div>
        <div className="relative mb-6 mt-[-0.5rem] flex flex-none px-4">
          <span className="flex-none rounded-l-lg bg-channeltextarea-background px-4 py-[0.625rem]">
            <div className="text-interactive">
              <Icon.AttachPlus className="cursor-pointer" />
            </div>
          </span>
          <textarea
            className="scrollbar-3 scrollbar-thumb-rounded-lg scrollbar-thumb-border max-h-[29.375rem] min-h-[2.75rem] flex-1 resize-none overflow-y-auto overflow-x-hidden rounded-r-lg bg-channeltextarea-background py-[0.625rem] font-primary text-normal outline-none placeholder:whitespace-nowrap placeholder:text-channeltextarea-placeholder -webkit-scrollbar-thumb:bg-[rgba(24,25,28,.6)]"
            rows={1}
            placeholder={
              friend !== null
                ? `Message ${friend.username}`
                : `Message ${privateChannel.privateChannelName}`
            }
            ref={textAreaMessage}
            value={draftMessage}
            onChange={(e) => {
              setDraftMessage((e.target as HTMLTextAreaElement).value);
            }}
            onKeyDown={(e) => {
              if (!currentChat || currentChat.pages.length === 0)
                return e.preventDefault();
              if (e.key !== 'Enter') return;
              if (e.shiftKey) return;
              e.preventDefault();
              if (!draftMessage.trim()) return;
              sendMessage(
                {
                  privateChannelId: privateChannel.id,
                  content: (e.target as HTMLTextAreaElement).value,
                },
                {
                  onSuccess: () => setDraftMessage(''),
                }
              );
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
      {privateChannel.isGroup && viewMemberList && user && (
        <ChatSecondaryView
          participants={Object.values(privateChannel.participants)}
        />
      )}
    </>
  );
};

export default ChatMainView;
