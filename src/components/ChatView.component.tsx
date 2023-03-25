import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { parseJSON } from 'date-fns';
import produce from 'immer';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import auth from '../apis/auth';
import chatAPI from '../apis/chat';
import friendAPI from '../apis/friend';
import getGapiAuthInstance from '../apis/gapiAuth';
import privateChannelAPI from '../apis/privateChannel';
import {
  ChatMessageItem,
  CurrentUser,
  FriendItem,
  FriendshipEnum,
  PrivateChannelItem,
} from '../interfaces';
import {
  UpdateFriendOperation,
  FriendRequest,
  SendPrivateChannelChatRequest,
} from '../interfaces/http-request';
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
  const { privateChannelId } = useParams();

  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async ({ signal }) => {
      const gapiAuth = await getGapiAuthInstance();
      if (!gapiAuth.isSignedIn.get()) {
        return;
      }
      const response = await auth.get<CurrentUser>('/login', {
        signal,
      });
      return response.data;
    },
  });

  const { data: currentPrivateChannel } = useQuery({
    queryKey: ['private-channel', privateChannelId],
    queryFn: async ({ queryKey, signal }) => {
      const response = await privateChannelAPI.get<PrivateChannelItem>(
        `/private/${queryKey[1]}`,
        { signal }
      );
      return response.data;
    },
  });

  const { data: friendship } = useQuery({
    queryKey: ['friends'],
    queryFn: async ({ signal }) => {
      const response = await friendAPI.get<Record<string, FriendItem>>('', {
        signal,
      });
      return response.data;
    },
    enabled: !!currentPrivateChannel && !currentPrivateChannel.isGroup,
    select(response) {
      if (
        !currentPrivateChannel ||
        Object.values(currentPrivateChannel.participants).length === 0
      ) {
        return null;
      }
      return response[Object.values(currentPrivateChannel.participants)[0].id]
        .friendshipStatus;
    },
  });

  const {
    data: currentChat,
    fetchNextPage: fetchNextChat,
    hasNextPage: hasNextChat,
  } = useInfiniteQuery({
    queryKey: ['chat', privateChannelId],
    queryFn: async ({ queryKey, signal, pageParam }) => {
      let response: AxiosResponse<ChatMessageItem, any>;
      if (pageParam === undefined) {
        response = await chatAPI.get<ChatMessageItem>(
          `/private/${queryKey[1]}`,
          { signal }
        );
      } else {
        response = await chatAPI.get<ChatMessageItem>(
          `/private/${queryKey[1]}/${pageParam}`,
          { signal }
        );
      }
      return response.data;
    },
    onSuccess(data) {
      if (data.pages.length !== 1 || data.pageParams[0] !== undefined) {
        return;
      }
      queryClient.setQueryData<InfiniteData<ChatMessageItem>>(
        ['chat', privateChannelId],
        (oldChat) => {
          if (!oldChat) return oldChat;
          return produce(oldChat, (draft) => {
            draft.pageParams[0] = data.pages[0].bucketId;
          });
        }
      );
    },
    getNextPageParam(firstPage) {
      if (firstPage.bucketId !== 0) {
        return firstPage.bucketId - 1;
      }
      return undefined;
    },
    getPreviousPageParam(lastPage) {
      return lastPage.bucketId + 1;
    },
  });

  const { mutate: updateFriend } = useMutation(
    async (friend: UpdateFriendOperation) => {
      const response = await friendAPI.put<FriendItem>(
        `/${friend.username}/${friend.discriminator}`,
        {
          friendshipStatus: friend.friendshipStatus,
        }
      );
      return response.data;
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData<Record<string, FriendItem>>(
          ['friends'],
          (oldFriends) => {
            if (!oldFriends) return { [response.friendId]: response };
            return {
              ...oldFriends,
              [response.friendId]: response,
            };
          }
        );
      },
    }
  );

  const { mutate: deleteFriend } = useMutation(
    async (friend: FriendRequest) => {
      const response = await friendAPI.delete<FriendItem>(
        `/${friend.username}/${friend.discriminator}`
      );
      return response.data;
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData<Record<string, FriendItem>>(
          ['friends'],
          (oldFriends) => {
            if (!oldFriends) return { [response.friendId]: response };
            return {
              ...oldFriends,
              [response.friendId]: response,
            };
          }
        );
      },
    }
  );

  const { mutate: sendMessage } = useMutation(
    async (req: SendPrivateChannelChatRequest) => {
      const response = await chatAPI.post<ChatMessageItem>(
        `/private/${req.privateChannelId}`,
        {
          content: req.content,
        }
      );
      return response.data;
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData<InfiniteData<ChatMessageItem>>(
          ['chat', response.channelId],
          (oldChat) => {
            if (!oldChat) return oldChat;
            return produce(oldChat, (draft) => {
              const bucketPage = draft.pages.find(
                (page) => page.bucketId === response.bucketId
              );

              if (bucketPage) {
                bucketPage.chatMessages = [
                  ...bucketPage.chatMessages,
                  ...response.chatMessages,
                ];
              } else {
                draft.pages.unshift(response);
                draft.pageParams.unshift(response.bucketId);
              }
            });
          }
        );
      },
    }
  );

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
  }, [privateChannelId]);

  return (
    <div className={className}>
      <div className="z-[2] flex h-12 flex-none items-center overflow-hidden px-2 shadow-elevation-low">
        <div className="flex items-center overflow-hidden">
          <div className="mx-2 text-muted">
            <Icon.Alias />
          </div>
          <div className="whitespace-nowrap font-display text-base font-semibold leading-5 text-header-primary">
            {currentPrivateChannel !== undefined
              ? currentPrivateChannel.isGroup
                ? currentPrivateChannel.privateChannelName
                : Object.values(currentPrivateChannel.participants)[0].username
              : ''}
          </div>
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
          {currentPrivateChannel && currentPrivateChannel.isGroup && (
            <div
              className="text-interactive mx-2 cursor-pointer"
              onClick={() => setViewMemberList((v) => !v)}
            >
              <Icon.Members />
            </div>
          )}
          <div className="mx-2 flex text-normal">
            <input
              className="h-6 w-[7.25rem] flex-1 rounded-l bg-tertiary pl-[0.375rem] font-primary text-sm font-medium leading-5 outline-none transition-[width] duration-[250ms] placeholder:text-muted focus:w-[13.25rem] placeholder-not-shown:w-[13.25rem]"
              placeholder="Search"
              type="text"
            />
            <div className="flex h-6 w-7 cursor-text items-center justify-center rounded-r bg-tertiary px-[0.125rem] text-muted">
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
                      previousChatMessage !== null &&
                      previousChatMessage.senderId ===
                        currentChatMessage.senderId;

                    const sender =
                      user?.id === currentChatMessage.senderId
                        ? {
                            id: user?.id,
                            avatar: user?.avatar,
                            username: user?.username,
                            discriminator: user?.discriminator,
                          }
                        : currentPrivateChannel?.participants[
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
              <AvatarIcon
                src={
                  currentPrivateChannel && !currentPrivateChannel.isGroup
                    ? Object.values(currentPrivateChannel.participants)[0]
                        .avatar
                    : undefined
                }
                width="w-20"
                height="h-20"
              />
              <label className="my-2 font-display text-[2rem] font-bold leading-10 text-header-primary">
                {currentPrivateChannel && currentPrivateChannel.isGroup
                  ? currentPrivateChannel.privateChannelName
                  : currentPrivateChannel != null
                  ? Object.values(currentPrivateChannel.participants)[0]
                      .username
                  : ''}
              </label>
              {currentPrivateChannel && !currentPrivateChannel.isGroup && (
                <>
                  <label className="font-primary text-base leading-5 text-header-secondary">
                    This is the beginning of your direct message history with
                    <strong className="font-semibold">
                      {` @${
                        Object.values(currentPrivateChannel.participants)[0]
                          .username
                      } `}
                    </strong>
                    .
                  </label>
                  <div className="mt-4 flex flex-wrap items-center gap-y-1">
                    <label className="my-[0.1875rem] font-primary text-sm leading-[1.125rem] text-header-secondary">
                      No servers in common
                    </label>
                    <div className="mx-4 my-[0.625rem] h-1 w-1 rounded-[50%] bg-interactive-muted"></div>
                    {friendship === null && (
                      <button
                        className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none rounded-[0.1875rem] bg-brand-experiment px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active hover:bg-brand-experiment-560 active:bg-brand-experiment-600"
                        onClick={async (e) => {
                          updateFriend({
                            username: Object.values(
                              currentPrivateChannel.participants
                            )[0].username,
                            discriminator: Object.values(
                              currentPrivateChannel.participants
                            )[0].discriminator,
                            friendshipStatus: FriendshipEnum.FRIEND,
                          });
                        }}
                      >
                        Add Friend
                      </button>
                    )}
                    {friendship === FriendshipEnum.PENDING && (
                      <button className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none cursor-not-allowed rounded-[0.1875rem] bg-brand-experiment px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active opacity-50">
                        Friend Request Sent
                      </button>
                    )}
                    {friendship === FriendshipEnum.REQUESTED && (
                      <>
                        <label className="mr-2 font-primary text-sm leading-[1.125rem] text-header-secondary">
                          Sent you a friend request:
                        </label>
                        <button
                          className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none rounded-[0.1875rem] bg-brand-experiment px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active hover:bg-brand-experiment-560 active:bg-brand-experiment-600"
                          onClick={async (e) => {
                            updateFriend({
                              username: Object.values(
                                currentPrivateChannel.participants
                              )[0].username,
                              discriminator: Object.values(
                                currentPrivateChannel.participants
                              )[0].discriminator,
                              friendshipStatus: FriendshipEnum.FRIEND,
                            });
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none rounded-[0.1875rem] bg-interactive-muted px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active hover:bg-[#686d73] active:bg-muted"
                          onClick={async (e) => {
                            deleteFriend({
                              username: Object.values(
                                currentPrivateChannel.participants
                              )[0].username,
                              discriminator: Object.values(
                                currentPrivateChannel.participants
                              )[0].discriminator,
                            });
                          }}
                        >
                          Ignore
                        </button>
                      </>
                    )}
                    {friendship === FriendshipEnum.FRIEND && (
                      <button
                        className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none rounded-[0.1875rem] bg-interactive-muted px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active hover:bg-[#686d73] active:bg-muted"
                        onClick={async (e) => {
                          deleteFriend({
                            username: Object.values(
                              currentPrivateChannel.participants
                            )[0].username,
                            discriminator: Object.values(
                              currentPrivateChannel.participants
                            )[0].discriminator,
                          });
                        }}
                      >
                        Remove Friend
                      </button>
                    )}
                    {friendship !== FriendshipEnum.BLOCKED && (
                      <button
                        className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none rounded-[0.1875rem] bg-interactive-muted px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active hover:bg-[#686d73] active:bg-muted"
                        onClick={async (e) => {
                          updateFriend({
                            username: Object.values(
                              currentPrivateChannel.participants
                            )[0].username,
                            discriminator: Object.values(
                              currentPrivateChannel.participants
                            )[0].discriminator,
                            friendshipStatus: FriendshipEnum.BLOCKED,
                          });
                        }}
                      >
                        Block
                      </button>
                    )}

                    {friendship === FriendshipEnum.BLOCKED && (
                      <button
                        className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none rounded-[0.1875rem] bg-interactive-muted px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active hover:bg-[#686d73] active:bg-muted"
                        onClick={async (e) => {
                          deleteFriend({
                            username: Object.values(
                              currentPrivateChannel.participants
                            )[0].username,
                            discriminator: Object.values(
                              currentPrivateChannel.participants
                            )[0].discriminator,
                          });
                        }}
                      >
                        Unblock
                      </button>
                    )}
                  </div>
                </>
              )}
              {currentPrivateChannel && currentPrivateChannel.isGroup && (
                <label className="font-primary text-base leading-5 text-header-secondary">
                  Welcome to the beginning of the
                  <strong className="font-semibold">
                    {` ${currentPrivateChannel.privateChannelName} `}
                  </strong>
                  group.
                </label>
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
              placeholder={`Message ${
                currentPrivateChannel !== undefined
                  ? currentPrivateChannel.isGroup
                    ? currentPrivateChannel.privateChannelName
                    : `@${
                        Object.values(currentPrivateChannel.participants)[0]
                          .username
                      }`
                  : ''
              }`}
              ref={textAreaMessage}
              value={draftMessage}
              onChange={(e) => {
                setDraftMessage((e.target as HTMLTextAreaElement).value);
              }}
              onKeyDown={(e) => {
                if (
                  !currentChat ||
                  currentChat.pages.length === 0 ||
                  !privateChannelId
                )
                  return e.preventDefault();
                if (e.key !== 'Enter') return;
                if (e.shiftKey) return;
                e.preventDefault();
                if (
                  !draftMessage.trim() &&
                  friendship === FriendshipEnum.FRIEND
                )
                  return;
                sendMessage(
                  {
                    privateChannelId,
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
        {currentPrivateChannel &&
          currentPrivateChannel.isGroup &&
          viewMemberList &&
          user && (
            <div className="scrollbar-2 scrollbar-thumb-rounded scrollbar-thumb-border hover-scrollbar-thumb flex w-60 flex-none flex-col overflow-y-scroll bg-secondary -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:bg-transparent">
              <label className="pt-6 pr-2 pl-4 font-display text-xs font-semibold uppercase tracking-[0.015625rem] text-channel-default">
                Members—
                {
                  Object.values(
                    Object.values(currentPrivateChannel.participants)
                  ).length
                }
              </label>
              {[
                ...Object.values(
                  Object.values(currentPrivateChannel.participants)
                ),
                {
                  id: user.id,
                  avatar: user.avatar,
                  username: user.username,
                  discriminator: user.discriminator,
                },
              ].map((participant) => (
                <div
                  key={participant.id}
                  className="text-interactive group ml-2 flex h-11 flex-none cursor-pointer items-center rounded-[0.25rem] px-2 py-[0.0625rem] hover:bg-modifier-hover"
                >
                  <AvatarIcon src={participant.avatar} />
                  <label className="ml-3 mt-[0.0625rem] cursor-pointer truncate font-primary text-base font-medium leading-5 text-channel-default group-hover:text-interactive-hover">
                    {participant.username}
                  </label>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

export default ChatView;
