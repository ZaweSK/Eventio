import { storage } from '@/storage/storage';
import { create } from 'zustand';

type AuthStore = {
    isAuthorised: boolean;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => void;
    refreshToken: () => void;
}

function StoreTokens(succesfullResponse : Response){
    const accessTokenKey = 'authorization';
    const refreshTokenKey = 'refresh-token';

    const header = succesfullResponse.headers;
    if (header.has(accessTokenKey)) {
        const token = header.get(accessTokenKey);
        if (token) {
            storage.set('accessToken', token);
        }
    }

    if (header.has(refreshTokenKey)) {
        const token = header.get(refreshTokenKey);
        if (token) {
            storage.set('refreshToken', token);
        }
      }

      console.log("HERE")
      console.log(storage.getString('accessToken'));
}


const useAuthStore = create<AuthStore>((set) => {
    let accessToken: string | null = null;
    let backendUrl = 'https://eventio-testproject-hdi74hwl5-strvcom.vercel.app/api/rest/v1';
    let singInUrl = `${backendUrl}/auth/native`;
    let refreshTokenUrl = `${backendUrl}/auth/refresh-token`;

    const apiKey = '7f1e275c-9430-4429-81b7-473078bd2fa8';

    const a = storage.getString('accessToken');
    console.log('aCEEES', a);
  
    return {
      isAuthorised: false,
  
      signIn: async (email: string, password: string) => {
        const accessToken = storage.getString('accessToken');
        const refreshToken = storage.getString('refreshToken');
        try {
          const response = await fetch(singInUrl, {
            method: 'POST',
            headers: {
              'apikey': '7f1e275c-9430-4429-81b7-473078bd2fa8',
              'Content-Type': 'application/json',
              'accept': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
  
          if (!response.ok) {
            console.log(JSON.stringify(response));
            throw new Error('Login failed');
          }

          StoreTokens(response);
  
          const data = await response.json();
  
          set({ isAuthorised: true });
  
          console.log('Signed in successfully');
        } catch (error) {
          console.error('Sign-in error:', error);
          set({ isAuthorised: false });
        }
      },
  
      signOut: () => {
        accessToken = null; // Clear the internal token
        set({ isAuthorised: false });
        console.log('Signed out');
      },

      refreshToken: async () => {
        try {
          const response = await fetch(singInUrl, {
            method: 'POST',
            headers: {
              'apikey': '7f1e275c-9430-4429-81b7-473078bd2fa8',
              'Content-Type': 'application/json',
              'accept': 'application/json',
            },
            body: JSON.stringify({
              refreshToken: "[...]",
            }),
          });
  
          if (!response.ok) {
            console.log(JSON.stringify(response));
            throw new Error('Login failed');
          }

          StoreTokens(response);
  
          const data = await response.json();
          accessToken = data.token; // Internally store the token
  
          set({ isAuthorised: true });
  
          console.log('Signed in successfully');
        } catch (error) {
          console.error('Sign-in error:', error);
          set({ isAuthorised: false });
        }
      }
    };
  });

export default useAuthStore;