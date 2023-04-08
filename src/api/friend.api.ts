import { FriendEntity, FriendshipEnum } from '@/interfaces/domain';
import axios from '@/lib/axios';

export interface GenericFriendRequest {
  username: string;
  discriminator: number;
}

export interface UpdateFriendRequest {
  username: string;
  discriminator: number;
  friendshipStatus: FriendshipEnum;
}

interface FriendResponse {
  friendId: string;
  friendshipStatus: FriendshipEnum | null;
  privateChannelId?: string;
  avatar: string;
  username: string;
  discriminator: number;
}

const friendApi = {
  getAll: async (): Promise<Record<string, FriendEntity>> => {
    const response = await axios.get<Record<string, FriendResponse>>(
      '/api/friend'
    );
    return response.data;
  },

  get: async ({
    username,
    discriminator,
  }: GenericFriendRequest): Promise<FriendEntity> => {
    const response = await axios.get<FriendResponse>(
      `/api/friend/${username}/${discriminator}`
    );
    return response.data;
  },

  post: async ({
    username,
    discriminator,
  }: GenericFriendRequest): Promise<FriendEntity> => {
    const response = await axios.post<FriendResponse>(
      `/api/friend/${username}/${discriminator}`
    );
    return response.data;
  },

  update: async ({
    username,
    discriminator,
    friendshipStatus,
  }: UpdateFriendRequest): Promise<FriendEntity> => {
    const response = await axios.put<FriendResponse>(
      `/api/friend/${username}/${discriminator}`,
      { friendshipStatus }
    );
    return response.data;
  },

  delete: async ({
    username,
    discriminator,
  }: GenericFriendRequest): Promise<FriendEntity> => {
    const response = await axios.delete<FriendResponse>(
      `/api/friend/${username}/${discriminator}`
    );
    return response.data;
  },
};

export default friendApi;
