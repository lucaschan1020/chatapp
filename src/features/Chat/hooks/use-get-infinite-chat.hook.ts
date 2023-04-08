import chatApi from '@/features/Chat/api/chat.api';
import { ChatBucketEntity, ChatEntity } from '@/interfaces/domain';
import { AppInfiniteQueryOptions } from '@/interfaces/utility-types';
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import produce from 'immer';

const useGetInfiniteChat = (
  privateChannelId: string | undefined,
  config?: AppInfiniteQueryOptions<ChatBucketEntity, ChatBucketEntity>
) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    ...config,
    queryKey: ['chats', privateChannelId!],
    queryFn: async ({ queryKey, pageParam }) => {
      if (pageParam === undefined) {
        return chatApi.getLatest({ privateChannelId: queryKey[1] });
      } else {
        return chatApi.get({
          privateChannelId: queryKey[1],
          bucketId: pageParam,
        });
      }
    },
    enabled: !!privateChannelId,
    onSuccess(data) {
      // set pageParam on first page
      if (data.pages.length !== 1 || data.pageParams[0] !== undefined) {
        return;
      }
      queryClient.setQueryData<InfiniteData<ChatBucketEntity>>(
        ['chat', privateChannelId],
        (oldChat) => {
          if (!oldChat) return oldChat;
          return produce(oldChat, (draft) => {
            draft.pageParams[0] = data.pages[0].bucketId;
          });
        }
      );
    },
    getNextPageParam(firstPage) {
      if (firstPage.bucketId !== 0) {
        return firstPage.bucketId - 1;
      }
      return undefined;
    },
    getPreviousPageParam(lastPage) {
      return lastPage.bucketId + 1;
    },
  });
};

export default useGetInfiniteChat;
