import privateChannelApi from '@/api/private-channel.api';
import { PrivateChannelEntity } from '@/interfaces/domain';
import { AppQueryOptions } from '@/interfaces/utility-types';
import { useQuery } from '@tanstack/react-query';

const useGetPrivateChannels = <T = Record<string, PrivateChannelEntity>>(
  config?: AppQueryOptions<Record<string, PrivateChannelEntity>, T>
) => {
  return useQuery({
    ...config,
    queryKey: ['private-channels'],
    queryFn: () => {
      return privateChannelApi.getAll();
    },
  });
};

export default useGetPrivateChannels;
