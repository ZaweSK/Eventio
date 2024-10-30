import { storage } from "@/storage/storage";
import { AsyncError } from "@/utils/result/AsyncError";
import { ErrorBody } from "@/utils/result/ErrorBody";

const BASE_URL = 'https://eventio-testproject-hdi74hwl5-strvcom.vercel.app/api/rest/v1';  // Centralized backend URL
const API_KEY = '7f1e275c-9430-4429-81b7-473078bd2fa8';

class ApiService {

    private createHeaders(): Record<string, string> {
        const accessToken = storage.getString('accessToken');
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'apikey': API_KEY,
        };
    
        if (accessToken) {
          headers['authorization'] = accessToken;
        }
    
        return headers;
      }

      async post(endpoint: string, data?: any): Promise<Response> {
        const requestInit = {
          method: 'POST',
          headers: this.createHeaders(),
          ...(data && { body: JSON.stringify(data)}),
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, requestInit);
    
        if (!response.ok) {
          const errorBody: ErrorBody = await response.json();

          if (response.status === 401 && errorBody.code === 'UNATHORIZED') {
            console.log("THROWING UNAUTHORIZED ERROR");
            
          }

          console.log("THROWING ASYNC ERROR");
          throw new AsyncError(response.status, response.statusText, errorBody);
        }

        return response;
      }

      async delete(endpoint: string): Promise<Response> {
        const requestInit = {
          method: 'DELETE',
          headers: this.createHeaders(),
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, requestInit);
    
        if (!response.ok) {
          throw new Error(`Error  ${response.status}: ${response.statusText}`);
        }

        return response;
      }


    // async post(endpoint: string, data: any): Promise<Response> {
    //     const response = await fetch(`${BASE_URL}${endpoint}`, {
    //       method: 'POST',
    //       headers: this.createHeaders(),
    //       body: JSON.stringify(data),
    //     });
    
    //     if (!response.ok) {
    //       throw new Error(`Error  WWW ${response.status}: ${response.statusText}`);
    //     }

    //     return response;
    // }

    async get(endpoint: string): Promise<Response> {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: 'GET',
          headers: this.createHeaders(),
        });
      
        // if (!response.ok) {
        //   throw new Error(`Error SSS ${response.status}: ${response.statusText}`);
        // }
      
        return response;
      };
}

export default ApiService;