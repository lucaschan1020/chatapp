import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { FriendshipEnum } from '../interfaces';
import { store } from '../state';
import { DeleteFriend, UpdateFriend } from '../state/reducers/FriendSlice';
import {
  CreatePrivateChannel,
  GetPrivateChannel,
  UpdatePrivateChannelListState,
} from '../state/reducers/PrivateChannelListSlice';
import leadingZero from '../utilities/leading-zero';
import AvatarIcon from './AvatarIcon.component';
import Icon from './Icon.component';

enum PageEnum {
  Online,
  All,
  Pending,
  Blocked,
}

const IndexFriendshipMapping: Record<number, FriendshipEnum[]> = {
  0: [FriendshipEnum.Friend],
  1: [FriendshipEnum.Friend],
  2: [FriendshipEnum.Pending, FriendshipEnum.Requested],
  3: [FriendshipEnum.Blocked],
};

interface FriendListProps {
  index: number;
}

function FriendList({ index }: FriendListProps) {
  const friends = useAppSelector((state) => {
    if (!state.Friends) return;
    return Object.values(state.Friends).filter((friend) =>
      IndexFriendshipMapping[index].some(
        (friendship) => friendship === friend.friendshipStatus
      )
    );
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex">
        <div className="bg-tertiary m-[0.0625rem] mt-4 mb-2 ml-[1.875rem] mr-5 flex min-w-0 flex-1 rounded p-[0.0625rem]">
          <input
            className="font-primary placeholder:text-muted text-normal m-[0.0625rem] h-[1.875rem] min-w-0 flex-1 bg-inherit py-[0.125rem] px-2 text-base font-normal leading-8 outline-none"
            placeholder="Search"
            type="text"
          />
          <div className="text-interactive-normal flex h-8 w-8 cursor-text items-center justify-center">
            <Icon.MagnifyingGlass className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="font-display text-header-secondary mt-4 mr-5 mb-2 ml-[1.875rem] text-xs font-semibold uppercase tracking-[0.015625rem]">
        {PageEnum[index]} — {friends?.length}
      </div>
      <div className="-webkit-scrollbar-thumb:min-h-[2.5rem] scrollbar-track scrollbar-4 -webkit-scrollbar-thumb:bg-scrollbar-thin-thumb scrollbar-thumb-rounded-lg scrollbar-thumb-border mt-2 flex flex-1 flex-col overflow-x-hidden overflow-y-scroll pb-2">
        {friends?.map((friend) => (
          <div
            key={friend._id}
            className="border-modifier-accent group hover:bg-modifier-hover ml-[1.875rem] mr-5 flex h-[3.875rem] flex-none cursor-pointer items-center justify-between border-t-[0.0625rem] border-solid hover:mr-[0.625rem] hover:ml-[1.25rem] hover:rounded-lg hover:border-transparent hover:py-4 hover:px-[0.625rem]"
          >
            <div className="item flex min-w-0">
              <AvatarIcon src={friend.avatar} />
              <div className="ml-3 flex flex-col overflow-x-hidden">
                <div className="flex items-end">
                  <span className="text-header-primary font-primary truncate text-base font-semibold leading-[1.1]">
                    {friend.username}
                  </span>
                  {(index === 0 || index === 1 || index === 3) && (
                    <span className="text-header-secondary font-primary hidden text-sm font-medium leading-4 group-hover:block">
                      #{leadingZero(friend.discriminator ?? 0, 4)}
                    </span>
                  )}
                </div>
                {(index === 0 || index === 1) && (
                  <span className="font-primary text-header-secondary truncate text-sm font-medium leading-5">
                    Online
                  </span>
                )}
                {index === 3 && (
                  <span className="font-primary text-header-secondary text-xs font-medium leading-5">
                    Blocked
                  </span>
                )}

                {index === 2 && (
                  <span className="font-primary text-header-secondary text-xs font-medium leading-5">
                    {friend.friendshipStatus === FriendshipEnum.Pending
                      ? 'Outgoing Friend Request'
                      : 'Incoming Friend Request'}
                  </span>
                )}
              </div>
            </div>
            {(index === 0 || index === 1) && (
              <div className="ml-2 flex">
                <div
                  className="bg-secondary group-hover:bg-tertiary text-interactive group-hover:active:bg-modifier-active active:text-interactive-active flex h-9 w-9 items-center justify-center rounded-[50%]"
                  onClick={async (e) => {
                    let state = store.getState();
                    if (!friend.privateChannelId) {
                      await dispatch(
                        CreatePrivateChannel({
                          participants: [friend._id],
                          privateChannelName: '',
                        })
                      );
                      state = store.getState();
                    }

                    if (!state.PrivateChannelList) {
                      await dispatch(UpdatePrivateChannelListState());
                    }

                    const privateChannel =
                      state.PrivateChannelList![friend.privateChannelId!];

                    if (!privateChannel) {
                      await dispatch(
                        GetPrivateChannel(friend.privateChannelId!)
                      );
                    }
                    navigate(
                      `/channels/@me/${
                        state.Friends[friend._id].privateChannelId
                      }`
                    );
                  }}
                >
                  <Icon.FriendMessage className="h-5 w-5" />
                </div>
                <div className="bg-secondary group-hover:bg-tertiary text-interactive group-hover:active:bg-modifier-active active:text-interactive-active ml-[0.625rem] flex h-9 w-9 items-center justify-center rounded-[50%]">
                  <Icon.FriendMore className="h-5 w-5" />
                </div>
              </div>
            )}
            {index === 2 && (
              <div className="ml-2 flex">
                {friend.friendshipStatus === FriendshipEnum.Requested && (
                  <div
                    className="bg-secondary text-interactive hover:text-interactive-green-normal active:bg-modifier-active active:text-interactive-active flex h-9 w-9 items-center justify-center rounded-[50%]"
                    onClick={async (e) => {
                      dispatch(
                        UpdateFriend({
                          username: friend.username,
                          discriminator: friend.discriminator,
                          friendshipStatus: FriendshipEnum.Friend,
                        })
                      );
                    }}
                  >
                    <Icon.ActionAccept className="h-5 w-5" />
                  </div>
                )}
                <div
                  className="bg-secondary text-interactive hover:text-interactive-red-normal active:bg-modifier-active active:text-interactive-active ml-[0.625rem] flex h-9 w-9 items-center justify-center rounded-[50%]"
                  onClick={(e) => {
                    dispatch(
                      DeleteFriend({
                        username: friend.username,
                        discriminator: friend.discriminator,
                      })
                    );
                  }}
                >
                  <Icon.ActionDeny className="h-5 w-5" />
                </div>
              </div>
            )}
            {index === 3 && (
              <div className="ml-2 flex">
                <div
                  className="bg-secondary text-interactive hover:text-status-danger active:bg-modifier-active active:text-interactive-active flex h-9 w-9 items-center justify-center rounded-[50%]"
                  onClick={async (e) => {
                    dispatch(
                      DeleteFriend({
                        username: friend.username,
                        discriminator: friend.discriminator,
                      })
                    );
                  }}
                >
                  <Icon.FriendBlock className="h-5 w-5" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default FriendList;
