import { storage } from "@/storage/storage";

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
    
        // if (accessToken) {
        //   headers['Authorization'] = `Bearer ${accessToken}`;
        // }
    
        return headers;
      }


    async post(endpoint: string, data: any): Promise<Response> {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: 'POST',
          headers: this.createHeaders(),
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error(`Error  WWW ${response.status}: ${response.statusText}`);
        }

        return response;
    }

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