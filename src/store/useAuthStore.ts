import { Result, Success, UserFriendlyError } from '@/src/utils/result/Result';
import { AxiosResponse, AxiosResponseHeaders } from 'axios';
import { api } from '@/src/api/apiClient';
import { create } from 'zustand';
import storeAccessToken from '@/src/utils/functions/storeAccessToken';
import { storage } from '@/src/storage/Storage';
import { EventioApiError } from '@/src/api/ApiError/EventioApiError';
import getUserFriendlyError from '@/src/utils/functions/getUserFriendlyError';


// ===================================== PRIVATE METHODS ====================================
function storeRefreshToken(response: AxiosResponse) {
  const { headers } = response;
  const axiosHeaders = headers as AxiosResponseHeaders;
  const refreshToken = axiosHeaders.get('Refresh-Token');

  if (!refreshToken) {
      console.error('Missing refresh token in sing-in response');
      return;
  }
  if (typeof refreshToken === 'string') storage.setRefreshToken(refreshToken);
}

function storeUserId(response: AxiosResponse) {
  const { data: body } = response;
  if (!body?.id) {
      console.error('Missing user id in sing-in response');
      return;
  }
  if (body?.id) storage.setUserId(body.id);
}

// ===================================== STORE SETUP ====================================

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
          const response  = await api.post('/auth/native', { email, password });
          storeRefreshToken(response)
          storeAccessToken(response)
          storeUserId(response)

          console.log('Signed in successfully')
          return Success()

        } catch (error) {
          console.error('Sign-in error:', error);
          return error instanceof EventioApiError && error.status === 404
            ? UserFriendlyError("404")
            : getUserFriendlyError(error);
        }
      },
  
      signOut: () => {
        storage.clearCredentials();
        console.log('Signed out')
      },
    };
  });

export default useAuthStore;