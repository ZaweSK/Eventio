import { storage } from '@/src/storage/storage';
import { create } from 'zustand';
import ApiService from '@/src/store/ApiService';
import { Result, Success, UserFriendlyError } from '@/src/utils/result/Result';
import getUserFriendlyError from '@/src/utils/getUserFriendlyError';
import { AsyncError } from '@/src/utils/result/AsyncError';

type AuthStore = {
    isAuthorised: boolean;
    signIn: (username: string, password: string) => Promise<Result>;
    signOut: () => void;
    // refreshToken: () => void;
}

const api = new ApiService();

async function StoreData(headers: Headers, body: any) {
    const accessTokenKey = 'authorization';
    const refreshTokenKey = 'refresh-token';
    const userIdKey = 'id';

    if (headers.has(accessTokenKey)) {
        const token = headers.get(accessTokenKey);
        if (token) {
            storage.set('accessToken', token);
        }
    }

    if (headers.has(refreshTokenKey)) {
        const token = headers.get(refreshTokenKey);
        if (token) {
            storage.set('refreshToken', token);
        }
      }

    if (body && body[userIdKey]) {
      storage.set('id', body[userIdKey]);
      console.log('Stored user id:', body[userIdKey]);
    }
}


const useAuthStore = create<AuthStore>((set, get) => {
    let accessToken: string | null = null;
    let backendUrl = 'https://eventio-testproject-hdi74hwl5-strvcom.vercel.app/api/rest/v1';
    let singInUrl = `${backendUrl}/auth/native`;
    let refreshTokenUrl = `${backendUrl}/auth/refresh-token`;

    const apiKey = '7f1e275c-9430-4429-81b7-473078bd2fa8';
  
    return {
      isAuthorised: false,
  
      signIn: async (email: string, password: string) : Promise<Result> => {
        const accessToken = storage.getString('accessToken');
        const refreshToken = storage.getString('refreshToken');
        try {
          const data = {
            email: email,
            password: password,
          }

          const response = await api.post('/auth/native', data);
          const body = await response.json()
          StoreData(response.headers, body)
          set({ isAuthorised: true })

          // log authorized );
          console.log(get().isAuthorised);
          
          
          console.log('Signed in successfully')
          return Success()

        } catch (error) {
          console.error('Sign-in error:', error);
          if (error instanceof AsyncError && error.status === 404) {
            return UserFriendlyError("404");
          } 

          return getUserFriendlyError(error);
        }
      },
  
      signOut: () => {
        accessToken = null; // Clear the internal token
        set({ isAuthorised: false });
        console.log('Signed out');
      },

      // refreshToken: async () => {
      //   try {
      //     const response = await fetch(singInUrl, {
      //       method: 'POST',
      //       headers: {
      //         'apikey': '7f1e275c-9430-4429-81b7-473078bd2fa8',
      //         'Content-Type': 'application/json',
      //         'accept': 'application/json',
      //       },
      //       body: JSON.stringify({
      //         refreshToken: "[...]",
      //       }),
      //     });
  
      //     if (!response.ok) {
      //       console.log(JSON.stringify(response));
      //       throw new Error('Login failed HERE');
      //     }

      //     StoreData(response);
  
      //     const data = await response.json();
      //     accessToken = data.token; // Internally store the token
  
      //     set({ isAuthorised: true });
  
      //     console.log('Signed in successfully');
      //   } catch (error) {
      //     console.error('Sign-in error:', error);
      //     set({ isAuthorised: false });
      //   }
      // }
    };
  });

export default useAuthStore;