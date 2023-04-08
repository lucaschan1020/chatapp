import authApi from '@/api/auth.api';
import { UserEntity } from '@/interfaces/domain';
import { AppQueryOptions } from '@/interfaces/utility-types';
import { useQuery } from '@tanstack/react-query';

const useUser = <T = UserEntity>(config?: AppQueryOptions<UserEntity, T>) => {
  return useQuery({
    ...config,
    queryKey: ['user'],
    queryFn: async () => {
      return authApi.get();
    },
  });
};

export default useUser;
