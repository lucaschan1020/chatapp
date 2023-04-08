import chatApi, { ChatCreateRequest } from '@/features/Chat/api/chat.api';
import { ChatBucketEntity } from '@/interfaces/domain';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import produce from 'immer';

const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (req: ChatCreateRequest) => {
      return chatApi.post(req);
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData<InfiniteData<ChatBucketEntity>>(
          ['chats', response.channelId],
          (oldChat) => {
            if (!oldChat) return oldChat;
            return produce(oldChat, (draft) => {
              const bucketPage = draft.pages.find(
                (page) => page.bucketId === response.bucketId
              );

              if (bucketPage) {
                bucketPage.chatMessages = [
                  ...bucketPage.chatMessages,
                  ...response.chatMessages,
                ];
              } else {
                draft.pages.unshift(response);
                draft.pageParams.unshift(response.bucketId);
              }
            });
          }
        );
      },
    }
  );
};

export default useCreateChat;
