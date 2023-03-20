import { parseJSON } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import friendAPI from '../apis/friend';
import { useAppDispatch, useAppSelector } from '../hooks';
import { FriendItem, FriendshipEnum } from '../interfaces';
import { store } from '../state';
import {
  GetBucketPrivateChannelChatMessage,
  GetPrivateChannelChatMessage,
  SendPrivateChannelChat,
} from '../state/reducers/ChatMessageSlice';
import {
  AddFriendsToList,
  DeleteFriend,
  UpdateFriend,
} from '../state/reducers/FriendSlice';
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
  const dispatch = useAppDispatch();

  const CurrentPrivateChannel = useAppSelector((state) => {
    if (!state.PrivateChannelList) return null;
    if (!privateChannelId) return null;
    const privateChannel = state.PrivateChannelList[privateChannelId];
    if (!privateChannel) return null;
    return privateChannel;
  });

  const CurrentUser = useAppSelector((state) => state.CurrentUser);

  const BucketChatMessages = useAppSelector((state) => {
    if (!privateChannelId) return null;
    if (!state.ChatMessages) return null;
    const bucketChat = state.ChatMessages[privateChannelId];
    if (!bucketChat) return null;
    return bucketChat;
  });

  const Friendship = useAppSelector((state) => {
    if (!CurrentPrivateChannel) return null;
    if (CurrentPrivateChannel.isGroup) return null;
    return state.Friends[
      Object.values(CurrentPrivateChannel.participants)[0].id
    ].friendshipStatus;
  });

  const newBucketDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!BucketChatMessages || Object.keys(BucketChatMessages).length === 0)
      return;
    if (!newBucketDiv.current) return;
    const availableBuckets = Object.keys(BucketChatMessages).map((bucketId) =>
      parseInt(bucketId)
    );
    const smallestBucketId = Math.min(...availableBuckets);
    if (smallestBucketId === 0) return;
    const smallestBucket = BucketChatMessages[smallestBucketId];
    let observer: IntersectionObserver | null = null;
    if (smallestBucket === undefined || smallestBucket !== null) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && privateChannelId) {
            dispatch(
              GetBucketPrivateChannelChatMessage({
                privateChannelId,
                bucketId: smallestBucketId - 1,
              })
            );
            observer!.unobserve(entry.target);
          }
        },
        {
          rootMargin: '10px',
        }
      );
      observer.observe(newBucketDiv.current);
    }

    return () => {
      if (newBucketDiv.current && observer)
        // eslint-disable-next-line
        observer.unobserve(newBucketDiv.current);
    };
    // eslint-disable-next-line
  }, [BucketChatMessages, privateChannelId]);

  useEffect(() => {
    if (textAreaMessage.current !== null) {
      textAreaMessage.current.style.height = '0px';
      const scrollHeight = textAreaMessage.current.scrollHeight;
      textAreaMessage.current.style.height = scrollHeight + 'px';
    }
  }, [draftMessage]);

  useEffect(() => {
    if (!privateChannelId) return;
    const state = store.getState();
    setDraftMessage('');

    if (
      state.ChatMessages === null ||
      state.ChatMessages[privateChannelId] === undefined
    ) {
      const promise = dispatch(GetPrivateChannelChatMessage(privateChannelId));
      return () => {
        promise.abort();
      };
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateChannelId]);

  return (
    <div className={className}>
      <div className="z-[2] flex h-12 flex-none items-center overflow-hidden px-2 shadow-elevation-low">
        <div className="flex items-center overflow-hidden">
          <div className="mx-2 text-muted">
            <Icon.Alias />
          </div>
          <div className="whitespace-nowrap font-display text-base font-semibold leading-5 text-header-primary">
            {CurrentPrivateChannel !== null
              ? CurrentPrivateChannel.isGroup
                ? CurrentPrivateChannel.privateChannelName
                : Object.values(CurrentPrivateChannel.participants)[0].username
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
          {CurrentPrivateChannel && CurrentPrivateChannel.isGroup && (
            <div
              className="text-interactive mx-2 cursor-pointer"
              onClick={() => setViewMemberList(!viewMemberList)}
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
            {BucketChatMessages &&
              Object.keys(BucketChatMessages)
                .filter((bucketId) => BucketChatMessages[bucketId])
                .flatMap((bucketId) =>
                  BucketChatMessages[bucketId]!.chatMessages.map(
                    ({ id, timestamp, senderId, content }) => ({
                      channelId: BucketChatMessages[bucketId]!.channelId,
                      bucketId: BucketChatMessages[bucketId]!.bucketId,
                      id,
                      timestamp: parseJSON(timestamp),
                      senderId,
                      content,
                    })
                  )
                )
                .map((_chatMessage, index, ChatMessages) => {
                  const currentChatMessage =
                    ChatMessages[ChatMessages.length - 1 - index];
                  const previousChatMessage =
                    ChatMessages[ChatMessages.length - 2 - index] ?? null;
                  const isConsecutive =
                    previousChatMessage !== null &&
                    previousChatMessage.senderId ===
                      currentChatMessage.senderId;
                  return (
                    <ChatMessage
                      key={currentChatMessage.id}
                      message={currentChatMessage}
                      isConsecutive={isConsecutive}
                    />
                  );
                })}
            <div ref={newBucketDiv}></div>

            <div className="m-4 flex flex-col">
              <AvatarIcon
                src={
                  CurrentPrivateChannel && !CurrentPrivateChannel.isGroup
                    ? Object.values(CurrentPrivateChannel.participants)[0]
                        .avatar
                    : undefined
                }
                width="w-20"
                height="h-20"
              />
              <label className="my-2 font-display text-[2rem] font-bold leading-10 text-header-primary">
                {CurrentPrivateChannel && CurrentPrivateChannel.isGroup
                  ? CurrentPrivateChannel.privateChannelName
                  : CurrentPrivateChannel != null
                  ? Object.values(CurrentPrivateChannel.participants)[0]
                      .username
                  : ''}
              </label>
              {CurrentPrivateChannel && !CurrentPrivateChannel.isGroup && (
                <>
                  <label className="font-primary text-base leading-5 text-header-secondary">
                    This is the beginning of your direct message history with
                    <strong className="font-semibold">
                      {` @${
                        Object.values(CurrentPrivateChannel.participants)[0]
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
                    {Friendship === null && (
                      <button
                        className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none rounded-[0.1875rem] bg-brand-experiment px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active hover:bg-brand-experiment-560 active:bg-brand-experiment-600"
                        onClick={async (e) => {
                          const response = await friendAPI.post<FriendItem>(
                            `/${
                              Object.values(
                                CurrentPrivateChannel.participants
                              )[0].username
                            }/${
                              Object.values(
                                CurrentPrivateChannel.participants
                              )[0].discriminator
                            }`
                          );

                          if (response.status === 201) {
                            dispatch(
                              AddFriendsToList({
                                [response?.data.friendId]: response?.data,
                              })
                            );
                          }
                        }}
                      >
                        Add Friend
                      </button>
                    )}
                    {Friendship === FriendshipEnum.PENDING && (
                      <button className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none cursor-not-allowed rounded-[0.1875rem] bg-brand-experiment px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active opacity-50">
                        Friend Request Sent
                      </button>
                    )}
                    {Friendship === FriendshipEnum.REQUESTED && (
                      <>
                        <label className="mr-2 font-primary text-sm leading-[1.125rem] text-header-secondary">
                          Sent you a friend request:
                        </label>
                        <button
                          className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none rounded-[0.1875rem] bg-brand-experiment px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active hover:bg-brand-experiment-560 active:bg-brand-experiment-600"
                          onClick={async (e) => {
                            await dispatch(
                              UpdateFriend({
                                username: Object.values(
                                  CurrentPrivateChannel.participants
                                )[0].username,
                                discriminator: Object.values(
                                  CurrentPrivateChannel.participants
                                )[0].discriminator,
                                friendshipStatus: FriendshipEnum.FRIEND,
                              })
                            );
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none rounded-[0.1875rem] bg-interactive-muted px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active hover:bg-[#686d73] active:bg-muted"
                          onClick={async (e) => {
                            await dispatch(
                              DeleteFriend({
                                username: Object.values(
                                  CurrentPrivateChannel.participants
                                )[0].username,
                                discriminator: Object.values(
                                  CurrentPrivateChannel.participants
                                )[0].discriminator,
                              })
                            );
                          }}
                        >
                          Ignore
                        </button>
                      </>
                    )}
                    {Friendship === FriendshipEnum.FRIEND && (
                      <button
                        className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none rounded-[0.1875rem] bg-interactive-muted px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active hover:bg-[#686d73] active:bg-muted"
                        onClick={async (e) => {
                          await dispatch(
                            DeleteFriend({
                              username: Object.values(
                                CurrentPrivateChannel.participants
                              )[0].username,
                              discriminator: Object.values(
                                CurrentPrivateChannel.participants
                              )[0].discriminator,
                            })
                          );
                        }}
                      >
                        Remove Friend
                      </button>
                    )}
                    {Friendship !== FriendshipEnum.BLOCKED && (
                      <button
                        className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none rounded-[0.1875rem] bg-interactive-muted px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active hover:bg-[#686d73] active:bg-muted"
                        onClick={async (e) => {
                          await dispatch(
                            UpdateFriend({
                              username: Object.values(
                                CurrentPrivateChannel.participants
                              )[0].username,
                              discriminator: Object.values(
                                CurrentPrivateChannel.participants
                              )[0].discriminator,
                              friendshipStatus: FriendshipEnum.BLOCKED,
                            })
                          );
                        }}
                      >
                        Block
                      </button>
                    )}

                    {Friendship === FriendshipEnum.BLOCKED && (
                      <button
                        className="mr-2 h-6 min-h-[1.5rem] min-w-[3.25rem] flex-none rounded-[0.1875rem] bg-interactive-muted px-4 py-[0.125rem] font-primary text-sm font-medium leading-4 text-interactive-active hover:bg-[#686d73] active:bg-muted"
                        onClick={async (e) => {
                          await dispatch(
                            DeleteFriend({
                              username: Object.values(
                                CurrentPrivateChannel.participants
                              )[0].username,
                              discriminator: Object.values(
                                CurrentPrivateChannel.participants
                              )[0].discriminator,
                            })
                          );
                        }}
                      >
                        Unblock
                      </button>
                    )}
                  </div>
                </>
              )}
              {CurrentPrivateChannel && CurrentPrivateChannel.isGroup && (
                <label className="font-primary text-base leading-5 text-header-secondary">
                  Welcome to the beginning of the
                  <strong className="font-semibold">
                    {` ${CurrentPrivateChannel.privateChannelName} `}
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
                CurrentPrivateChannel !== null
                  ? CurrentPrivateChannel.isGroup
                    ? CurrentPrivateChannel.privateChannelName
                    : `@${
                        Object.values(CurrentPrivateChannel.participants)[0]
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
                  !BucketChatMessages ||
                  Object.keys(BucketChatMessages).length === 0 ||
                  !privateChannelId
                )
                  return e.preventDefault();
                if (e.key !== 'Enter') return;
                if (e.shiftKey) return;
                e.preventDefault();
                if (
                  !draftMessage.trim() &&
                  Friendship === FriendshipEnum.FRIEND
                )
                  return;
                dispatch(
                  SendPrivateChannelChat({
                    privateChannelId,
                    content: (e.target as HTMLTextAreaElement).value,
                  })
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
        {CurrentPrivateChannel &&
          CurrentPrivateChannel.isGroup &&
          viewMemberList &&
          CurrentUser && (
            <div className="scrollbar-2 scrollbar-thumb-rounded scrollbar-thumb-border hover-scrollbar-thumb flex w-60 flex-none flex-col overflow-y-scroll bg-secondary -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:bg-transparent">
              <label className="pt-6 pr-2 pl-4 font-display text-xs font-semibold uppercase tracking-[0.015625rem] text-channel-default">
                Members—
                {
                  Object.values(
                    Object.values(CurrentPrivateChannel.participants)
                  ).length
                }
              </label>
              {[
                ...Object.values(
                  Object.values(CurrentPrivateChannel.participants)
                ),
                {
                  id: CurrentUser.id,
                  avatar: CurrentUser.avatar,
                  username: CurrentUser.username,
                  discriminator: CurrentUser.discriminator,
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
