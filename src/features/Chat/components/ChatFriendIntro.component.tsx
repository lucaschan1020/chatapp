import useDeleteFriend from '@/hooks/use-delete-friend.hook';
import useGetFriends from '@/hooks/use-get-friends.hook';
import useUpdateFriend from '@/hooks/use-update-friend.hook';
import {
  FriendshipEnum,
  PrivateChannelParticipantEntity,
} from '@/interfaces/domain';

interface ChatFriendIntroProps {
  friend: PrivateChannelParticipantEntity;
}

const ChatFriendIntro: React.FC<ChatFriendIntroProps> = ({ friend }) => {
  const { data: friendship } = useGetFriends({
    select(response) {
      return friend ? response[friend.id].friendshipStatus : null;
    },
  });

  const { mutate: updateFriend } = useUpdateFriend();

  const { mutate: deleteFriend } = useDeleteFriend();

  return (
    <>
      <label className="font-primary text-base leading-5 text-header-secondary">
        This is the beginning of your direct message history with
        <strong className="font-semibold">{` @${friend.username} `}</strong>.
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
                username: friend.username,
                discriminator: friend.discriminator,
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
                  username: friend.username,
                  discriminator: friend.discriminator,
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
                  username: friend.username,
                  discriminator: friend.discriminator,
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
                username: friend.username,
                discriminator: friend.discriminator,
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
                username: friend.username,
                discriminator: friend.discriminator,
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
                username: friend.username,
                discriminator: friend.discriminator,
              });
            }}
          >
            Unblock
          </button>
        )}
      </div>
    </>
  );
};

export default ChatFriendIntro;
