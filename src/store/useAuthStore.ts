import { create } from 'zustand';
import { storage } from '@/src/storage/Storage';

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