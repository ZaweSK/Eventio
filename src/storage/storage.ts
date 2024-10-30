import { MMKV } from 'react-native-mmkv'

const storageKeys = {
    accessToken : 'accessToken',
    refreshToken: 'refreshToken'
}

const storageInstance = new MMKV({
    id: 'app-storage',
    encryptionKey: 'your-encryption-key', 
});
  
const setAccessToken = (token: string) => storageInstance.set(storageKeys.accessToken, token);
const getAccessToken = () => storageInstance.getString(storageKeys.accessToken);
  
const setRefreshToken = (token: string) => storageInstance.set(storageKeys.refreshToken, token);
const getRefreshToken = () => storageInstance.getString(storageKeys.refreshToken);

const storage = {
    setAccessToken,
    getAccessToken,
    setRefreshToken,
    getRefreshToken
}

export default storage;