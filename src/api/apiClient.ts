import { storage } from "@/src/storage/Storage";
import storeAccessToken from "@/src/utils/storeAccessToken";
import axios from "axios";

// ===================================== CONSTANTS ====================================

const BASE_URL = 'https://eventio-testproject-hdi74hwl5-strvcom.vercel.app/api/rest/v1';
const API_KEY = '7f1e275c-9430-4429-81b7-473078bd2fa8';

const HEADER_KEYS = {
    accessToken: 'authorization',
    refreshToken : 'refresh',
    apiKey : 'apikey'
}

// ===================================== PRIVATE METHODS ================================

function addApiKey(headers: Record<string, string>) {
    headers[HEADER_KEYS.apiKey] = API_KEY;
}

function addAccessTokenIfAny(headers: Record<string, string>) {
    const accessToken = storage.getAccessToken();
    if (accessToken) {
        headers[HEADER_KEYS.accessToken] = accessToken;
    }
}

// ===================================  API CLIENT SETUP ================================

export const api = axios.create({baseURL: BASE_URL });

api.interceptors.request.use(
    (config) => {
        addApiKey(config.headers);
        addAccessTokenIfAny(config.headers);
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = storage.getRefreshToken();

            if (refreshToken) {
                const response = await api.post('/auth/refresh-token', { refreshToken: refreshToken });
                storeAccessToken(response);
                const refreshedAccessToken = storage.getAccessToken();
                api.defaults.headers.common[HEADER_KEYS.accessToken] = refreshedAccessToken; 
                originalRequest.headers[HEADER_KEYS.accessToken] = refreshedAccessToken;

                return api(originalRequest); // Retry original request
            }
        }
        return Promise.reject(error);
    }
);