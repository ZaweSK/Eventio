import { create } from 'zustand';

type AuthStore = {
    isAuthorised: boolean;
    signIn: (username: string, password: string) => Promise<void>;
}


const useAuthStore = create<AuthStore>((set) => {
    let accessToken: string | null = null;
    let backendUrl = 'https://eventio-testproject-hdi74hwl5-strvcom.vercel.app/api/rest/v1';
    let singInUrl = `${backendUrl}/auth/native`;
  
    return {
      isAuthorised: false,
  
      signIn: async (username: string, password: string) => {
        try {
          const response = await fetch(singInUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
  
          if (!response.ok) {
            console.log(JSON.stringify(response));
            throw new Error('Login failed');
          }
  
          const data = await response.json();
          accessToken = data.token; // Internally store the token
  
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
    };
  });

export default useAuthStore;