import friendApi from '@/api/friend.api';
import { FriendEntity } from '@/interfaces/domain';
import { AppQueryOptions } from '@/interfaces/utility-types';
import { useQuery } from '@tanstack/react-query';

const useGetFriends = <T = Record<string, FriendEntity>>(
  config?: AppQueryOptions<Record<string, FriendEntity>, T>
) => {
  return useQuery({
    ...config,
    queryKey: ['friends'],
    queryFn: async () => {
      return friendApi.getAll();
    },
  });
};

export default useGetFriends;
