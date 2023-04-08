import friendApi, { GenericFriendRequest } from '@/api/friend.api';
import { FriendEntity } from '@/interfaces/domain';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAddFriend = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (friend: GenericFriendRequest) => {
      return friendApi.post(friend);
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData<Record<string, FriendEntity>>(
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
};

export default useAddFriend;
