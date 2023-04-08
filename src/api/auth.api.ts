import { UserEntity } from '@/interfaces/domain';
import axios from '@/lib/axios';

interface LoginResponse {
  id: string;
  sub: string;
  email: string;
  emailVerified: boolean;
  name: string;
  avatar: string;
  givenName: string;
  familyName: string;
  locale: string;
  username: string;
  discriminator: number;
}

const authApi = {
  get: async (): Promise<UserEntity> => {
    const response = await axios.get<LoginResponse>('/api/auth/login');
    return response.data;
  },
  post: async (): Promise<UserEntity> => {
    const response = await axios.post<LoginResponse>('/api/auth/login');
    return response.data;
  },
};

export default authApi;
