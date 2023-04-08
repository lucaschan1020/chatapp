import { UserEntity } from '@/interfaces/domain';
import axios from '@/lib/axios';
import getGapiAuthInstance from '@/lib/gapi-auth';

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
    const gapiAuthInstance = await getGapiAuthInstance();
    const token = gapiAuthInstance.currentUser.get().getAuthResponse().id_token;
    const response = await axios.post<LoginResponse>('/api/auth/login', {
      userToken: token,
    });
    return response.data;
  },
};

export default authApi;
