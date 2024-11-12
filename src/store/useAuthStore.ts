import { storage } from '@/src/storage/localStorage';
import { create } from 'zustand';

type AuthStore = {
  isSignedIn: boolean;
  signOut: () => void;
}

const useAuthStore = create<AuthStore>((set, get) => {
    return {
      get isSignedIn() {
        return !!storage.getAccessToken() && !!storage.getRefreshToken() && !!storage.getUserId();
      },
  
      signOut: () => {
        storage.clearCredentials();
        console.log('Signed out')
      },
    };
  });

export default useAuthStore;