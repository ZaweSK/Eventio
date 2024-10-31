import { MMKV } from 'react-native-mmkv'

const storageKeys = {
    accessToken : 'accessToken',
    refreshToken: 'refreshToken',
    userId: 'userId'
}

const storageInstance = new MMKV({
    id: 'app-storage',
    encryptionKey: 'your-encryption-key', 
});
  
const setAccessToken = (token: string) => storageInstance.set(storageKeys.accessToken, token);
const getAccessToken = () => storageInstance.getString(storageKeys.accessToken);
  
const setRefreshToken = (token: string) => storageInstance.set(storageKeys.refreshToken, token);
const getRefreshToken = () => storageInstance.getString(storageKeys.refreshToken);

const setUserId = (id: string) => storageInstance.set(storageKeys.userId, id);
const getUserId = () => storageInstance.getString(storageKeys.userId);

const clearCredentials = () => { 
    storageInstance.delete(storageKeys.accessToken);
    storageInstance.delete(storageKeys.refreshToken);
    storageInstance.delete(storageKeys.userId);
}

const storage = {
    setAccessToken,
    getAccessToken,
    setRefreshToken,
    getRefreshToken,
    clearCredentials,
    setUserId,
    getUserId,
}

export default storage;