import useGetFriends from '@/hooks/use-get-friends.hook';
import { useNavigate } from 'react-router-dom';
import useUpdateFriend from '@/hooks/use-update-friend.hook';
import useDeleteFriend from '@/hooks/use-delete-friend.hook';
import { FriendEntity, FriendshipEnum } from '@/interfaces/domain';
import useAddPrivateChannel from '@/hooks/use-add-private-channel.hook';
import { useQueryClient } from '@tanstack/react-query';
import Icon from '@/components/Icon.component';
import AvatarIcon from '@/components/AvatarIcon.component';
import leadingZero from '@/utilities/leading-zero';

enum HeaderEnum {
  ONLINE = 'Online',
  ALL = 'All',
  PENDING = 'Pending',
  BLOCKED = 'Blocked',
}

const FRIENDSHIP_FILTER_MAPPING = [
  [FriendshipEnum.FRIEND],
  [FriendshipEnum.FRIEND],
  [FriendshipEnum.PENDING, FriendshipEnum.REQUESTED],
  [FriendshipEnum.BLOCKED],
] as const;

interface FriendListProps {
  index: number;
}

const FriendList: React.FC<FriendListProps> = ({ index }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: friends } = useGetFriends({
    select(response) {
      return Object.values(response ?? {}).filter((friend) =>
        FRIENDSHIP_FILTER_MAPPING[index].some(
          (friendship) => friendship === friend.friendshipStatus
        )
      );
    },
  });

  const { mutate: updateFriend } = useUpdateFriend();

  const { mutate: deleteFriend } = useDeleteFriend();

  const { mutate: createPrivateChannel } = useAddPrivateChannel();

  const navigateToNewPrivateChannel = (friend: FriendEntity) => {
    const updateFriend = queryClient.getQueryData<Record<string, FriendEntity>>(
      ['friends']
    );
    if (!updateFriend) return;
    if (!updateFriend[friend.friendId]?.privateChannelId) return;
    navigate(`/channels/@me/${updateFriend[friend.friendId].privateChannelId}`);
  };

  return (
    <>
      <div className="flex">
        <div className="m-[0.0625rem] mt-4 mb-2 ml-[1.875rem] mr-5 flex min-w-0 flex-1 overflow-x-hidden rounded bg-tertiary p-[0.0625rem]">
          <input
            className="m-[0.0625rem] h-[1.875rem] min-w-0 flex-1 bg-inherit py-[0.125rem] px-2 font-primary text-base font-normal leading-8 text-normal outline-none placeholder:text-muted"
            placeholder="Search"
            type="text"
          />
          <div className="flex h-8 w-8 cursor-text items-center justify-center text-interactive-normal">
            <Icon.MagnifyingGlass className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="mt-4 mr-5 mb-2 ml-[1.875rem] font-display text-xs font-semibold uppercase tracking-[0.015625rem] text-header-secondary">
        {Object.values(HeaderEnum)[index]} — {friends?.length}
      </div>
      <div className="scrollbar-track scrollbar-4 scrollbar-thumb-rounded-lg scrollbar-thumb-border flex-rest-y mt-2 flex flex-col overflow-x-hidden overflow-y-scroll pb-2 -webkit-scrollbar-thumb:min-h-[2.5rem] -webkit-scrollbar-thumb:bg-scrollbar-thin-thumb">
        {friends?.map((friend) => (
          <div
            key={friend.friendId}
            className="group ml-[1.875rem] mr-5 flex h-[3.875rem] flex-none cursor-pointer items-center justify-between border-t-[0.0625rem] border-solid border-modifier-accent hover:mr-[0.625rem] hover:ml-[1.25rem] hover:rounded-lg hover:border-transparent hover:bg-modifier-hover hover:py-4 hover:px-[0.625rem]"
          >
            <div className="item flex min-w-0">
              <AvatarIcon
                src={friend.avatar}
                className="min-h-[2rem] min-w-[2rem]"
              />
              <div className="ml-3 flex flex-col overflow-x-hidden">
                <div className="flex items-end">
                  <span className="truncate font-primary text-base font-semibold leading-[1.1] text-header-primary">
                    {friend.username}
                  </span>
                  {(index === 0 || index === 1 || index === 3) && (
                    <span className="hidden font-primary text-sm font-medium leading-4 text-header-secondary group-hover:block">
                      #{leadingZero(friend.discriminator ?? 0, 4)}
                    </span>
                  )}
                </div>
                {(index === 0 || index === 1) && (
                  <span className="truncate font-primary text-sm font-medium leading-5 text-header-secondary">
                    Online
                  </span>
                )}
                {index === 3 && (
                  <span className="font-primary text-xs font-medium leading-5 text-header-secondary">
                    Blocked
                  </span>
                )}

                {index === 2 && (
                  <span className="font-primary text-xs font-medium leading-5 text-header-secondary">
                    {friend.friendshipStatus === FriendshipEnum.PENDING
                      ? 'Outgoing Friend Request'
                      : 'Incoming Friend Request'}
                  </span>
                )}
              </div>
            </div>
            {(index === 0 || index === 1) && (
              <div className="ml-2 flex">
                <div
                  className="text-interactive flex h-9 w-9 items-center justify-center rounded-[50%] bg-secondary active:text-interactive-active group-hover:bg-tertiary group-hover:active:bg-modifier-active"
                  onClick={async (e) => {
                    if (!friend.privateChannelId) {
                      createPrivateChannel(
                        {
                          participants: [friend.friendId],
                          privateChannelName: '',
                        },
                        {
                          onSuccess: () => navigateToNewPrivateChannel(friend),
                        }
                      );
                    } else {
                      navigateToNewPrivateChannel(friend);
                    }
                  }}
                >
                  <Icon.FriendMessage className="h-5 w-5" />
                </div>
                <div className="text-interactive ml-[0.625rem] flex h-9 w-9 items-center justify-center rounded-[50%] bg-secondary active:text-interactive-active group-hover:bg-tertiary group-hover:active:bg-modifier-active">
                  <Icon.FriendMore className="h-5 w-5" />
                </div>
              </div>
            )}
            {index === 2 && (
              <div className="ml-2 flex">
                {friend.friendshipStatus === FriendshipEnum.REQUESTED && (
                  <div
                    className="text-interactive flex h-9 w-9 items-center justify-center rounded-[50%] bg-secondary hover:text-interactive-green-normal active:bg-modifier-active active:text-interactive-active"
                    onClick={async (e) => {
                      updateFriend({
                        username: friend.username,
                        discriminator: friend.discriminator,
                        friendshipStatus: FriendshipEnum.FRIEND,
                      });
                    }}
                  >
                    <Icon.ActionAccept className="h-5 w-5" />
                  </div>
                )}
                <div
                  className="text-interactive ml-[0.625rem] flex h-9 w-9 items-center justify-center rounded-[50%] bg-secondary hover:text-interactive-red-normal active:bg-modifier-active active:text-interactive-active"
                  onClick={(e) => {
                    deleteFriend({
                      username: friend.username,
                      discriminator: friend.discriminator,
                    });
                  }}
                >
                  <Icon.ActionDeny className="h-5 w-5" />
                </div>
              </div>
            )}
            {index === 3 && (
              <div className="ml-2 flex">
                <div
                  className="text-interactive flex h-9 w-9 items-center justify-center rounded-[50%] bg-secondary hover:text-status-danger active:bg-modifier-active active:text-interactive-active"
                  onClick={async (e) => {
                    deleteFriend({
                      username: friend.username,
                      discriminator: friend.discriminator,
                    });
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
};

export default FriendList;
