import privateChannelApi, {
  CreatePrivateChannelRequest,
} from '@/api/private-channel.api';
import { PrivateChannelEntity } from '@/interfaces/domain';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import produce from 'immer';

const useAddPrivateChannel = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newPrivateChannel: CreatePrivateChannelRequest) => {
      return privateChannelApi.post(newPrivateChannel);
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData<Record<string, PrivateChannelEntity>>(
          ['private-channels'],
          (oldPrivateChannels) => {
            if (!oldPrivateChannels) return { [response.id]: response };
            return produce(oldPrivateChannels, (draft) => {
              draft[response.id] = response;
            });
          }
        );
      },
    }
  );
};

export default useAddPrivateChannel;
