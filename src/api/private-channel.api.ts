import { PrivateChannelEntity } from '@/interfaces/domain';
import axios from '@/lib/axios';

export interface CreatePrivateChannelRequest {
  participants: string[];
  privateChannelName: string;
}

interface ParticipantResponse {
  id: string;
  avatar: string;
  username: string;
  discriminator: number;
}

interface PrivateChannelResponse {
  id: string;
  participants: Record<string, ParticipantResponse>;
  privateChannelName: string;
  dateCreated: Date;
  isGroup: boolean;
}

const privateChannelApi = {
  get: async (privateChannelId: string): Promise<PrivateChannelEntity> => {
    const response = await axios.get<PrivateChannelResponse>(
      `/api/private-channel/private/${privateChannelId}`
    );
    return response.data;
  },

  getAll: async (): Promise<Record<string, PrivateChannelEntity>> => {
    const response = await axios.get<Record<string, PrivateChannelResponse>>(
      '/api/private-channel/private'
    );
    return response.data;
  },

  post: async (
    request: CreatePrivateChannelRequest
  ): Promise<PrivateChannelEntity> => {
    const response = await axios.post<PrivateChannelResponse>(
      '/api/private-channel/private',
      request
    );
    return response.data;
  },
};

export default privateChannelApi;
