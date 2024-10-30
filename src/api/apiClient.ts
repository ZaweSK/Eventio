import storage from "@/src/storage/storage";
import axios from "axios";

const BASE_URL = 'https://eventio-testproject-hdi74hwl5-strvcom.vercel.app/api/rest/v1';  // Centralized backend URL
const API_KEY = '7f1e275c-9430-4429-81b7-473078bd2fa8';

const headerKeys = {
    accessToken: 'authorization',
    refreshToken : 'refresh',
    apiKey : 'apikey'
}


// ===================================== HELPER METHODS ====================================

function addApiKey(headers: Record<string, string>) {
    headers[headerKeys.apiKey] = API_KEY;
}

function addAccessTokenIfAny(headers: Record<string, string>) {
    const accessToken = storage.getAccessToken();
    if (accessToken) {
        headers[headerKeys.accessToken] = accessToken;
    }
}

// ===================================  API CLIENT SETUP ===================================

const api = axios.create({baseURL: BASE_URL });

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
                const response = await axios.post('/auth/refresh', { refreshToken: refreshToken });
                const newAccessToken = response.data.accessToken;

                storage.setAccessToken(newAccessToken);
                api.defaults.headers.common[headerKeys.accessToken] = newAccessToken; 
                originalRequest.headers[headerKeys.accessToken] = newAccessToken;

                return api(originalRequest); // Retry original request
            }
        }
        return Promise.reject(error);
    }
);

export default api;