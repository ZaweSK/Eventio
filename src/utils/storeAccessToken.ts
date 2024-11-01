import { storage } from "@/src/storage/Storage";
import { AxiosResponse, AxiosResponseHeaders } from "axios";

function storeAccessToken(response: AxiosResponse) {
    const { headers, data: body } = response;
    const axiosHeaders = headers as AxiosResponseHeaders;

    const accessToken = axiosHeaders.get('Authorization');

    if (!accessToken) {
        console.error('Missing credentials in response');
        return;
    }
    if (typeof accessToken === 'string') storage.setAccessToken(accessToken);


    console.log('Succesfully stored credentials');
}

export default storeAccessToken;