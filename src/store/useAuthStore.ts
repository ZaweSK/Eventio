import { Result, Success, UserFriendlyError } from '@/src/utils/result/Result';
import getUserFriendlyError from '@/src/utils/getUserFriendlyError';
import { AsyncError } from '@/src/utils/result/AsyncError';
import storage from '@/src/storage/Storage';
import { AxiosResponseHeaders } from 'axios';
import api from '@/src/api/apiClient';
import { create } from 'zustand';

// ================================================= PRIVATE METHODS  ================================================

async function storeCredentials(headers: AxiosResponseHeaders, body: any) {
    const accessToken = headers.get('Authorization');
    const refreshToken = headers.get('Refresh-Token');

    if (!accessToken || !refreshToken || !body?.id) {
        console.error('Missing credentials in response');
        return;
    }
    if (typeof accessToken === 'string') storage.setAccessToken(accessToken);
    if (typeof refreshToken === 'string') storage.setRefreshToken(refreshToken);
    if (body?.id) storage.setUserId(body.id);
}

function clearCredentials() {
    storage.clearCredentials();
}
//============================================== STORE SETUP ==========================================================

type AuthStore = {
  isSignedIn: boolean;

  signOut: () => void;
  signIn: (username: string, password: string) => Promise<Result>;
}

const useAuthStore = create<AuthStore>((set, get) => {
    return {
      get isSignedIn() {
        return !!storage.getAccessToken() && !!storage.getRefreshToken() && !!storage.getUserId();
      },
  
      signIn: async (email: string, password: string) : Promise<Result> => {
        try {
          const { data, headers } = await api.post('/auth/native', { email, password });
          storeCredentials(headers as AxiosResponseHeaders, data)
          console.log('Signed in successfully')
          return Success()

        } catch (error) {
          console.error('Sign-in error:', error);
          return error instanceof AsyncError && error.status === 404
            ? UserFriendlyError("404")
            : getUserFriendlyError(error);
        }
      },
  
      signOut: () => {
        clearCredentials()
        console.log('Signed out')
      },
    };
  });

export default useAuthStore;