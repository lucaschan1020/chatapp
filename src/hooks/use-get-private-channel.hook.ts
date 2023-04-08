import privateChannelApi from '@/api/private-channel.api';
import { PrivateChannelEntity } from '@/interfaces/domain';
import { AppQueryOptions } from '@/interfaces/utility-types';
import { useQuery } from '@tanstack/react-query';

const usePrivateChannel = <T = PrivateChannelEntity>(
  privateChannelId: string | undefined,
  config?: AppQueryOptions<PrivateChannelEntity, T>
) => {
  return useQuery({
    ...config,
    queryKey: ['private-channels', privateChannelId!],
    queryFn: async ({ queryKey }) => {
      return privateChannelApi.get(queryKey[1]);
    },
    enabled: !!privateChannelId,
  });
};

export default usePrivateChannel;
