import friendApi, { GenericFriendRequest } from '@/api/friend.api';
import { FriendEntity } from '@/interfaces/domain';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import produce from 'immer';

const useDeleteFriend = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (friend: GenericFriendRequest) => {
      return friendApi.delete(friend);
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData<Record<string, FriendEntity>>(
          ['friends'],
          (oldFriends) => {
            if (!oldFriends) return { [response.friendId]: response };
            return produce(oldFriends, (draft) => {
              draft[response.friendId] = response;
            });
          }
        );
      },
    }
  );
};

export default useDeleteFriend;
