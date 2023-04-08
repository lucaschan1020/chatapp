import { ChatBucketEntity } from '@/interfaces/domain';
import axios from '@/lib/axios';

export interface ChatGetLatestRequest {
  privateChannelId: string;
}

export interface ChatGetRequest {
  privateChannelId: string;
  bucketId: number;
}

export interface ChatCreateRequest {
  privateChannelId: string;
  content: string;
}

interface ChatMessageResponse {
  id: string;
  timestamp: Date;
  senderId: string;
  content: string | null;
  lastModified: Date;
}

interface ChatBucketResponse {
  channelId: string;
  chatMessages: ChatMessageResponse[];
  bucketId: number;
}

const chatApi = {
  get: async ({
    privateChannelId,
    bucketId,
  }: ChatGetRequest): Promise<ChatBucketEntity> => {
    const response = await axios.get<ChatBucketResponse>(
      `/api/chat/private/${privateChannelId}/${bucketId}`
    );
    return response.data;
  },

  getLatest: async ({
    privateChannelId,
  }: ChatGetLatestRequest): Promise<ChatBucketEntity> => {
    const response = await axios.get<ChatBucketResponse>(
      `/api/chat/private/${privateChannelId}`
    );
    return response.data;
  },

  post: async ({
    privateChannelId,
    content,
  }: ChatCreateRequest): Promise<ChatBucketEntity> => {
    const response = await axios.post<ChatBucketResponse>(
      `/api/chat/private/${privateChannelId}`,
      {
        content,
      }
    );
    return response.data;
  },
};

export default chatApi;
