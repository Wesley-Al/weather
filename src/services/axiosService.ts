import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";
import { URL_OPEN_WEATHER } from '@env';
import { Alert } from "react-native";

const apiUrl = URL_OPEN_WEATHER;

export const AxiosService = {
    get: (url: string): AxiosPromise<any> => {
        const apiEndpoint = apiUrl.concat(url);

        const header = getHeaderRequest();
        const response = axios.get(apiEndpoint, header);

        validateResponse(response);
        return response;
    },

    post: (url: string, payload: any, useToken = true): AxiosPromise<any> => {
        const apiEndpoint = apiUrl.concat(url);

        const header = useToken ? getHeaderRequest() : {};
        const response = axios.post(apiEndpoint, payload, header);

        validateResponse(response);
        return response;
    },

    delete: (url: string): AxiosPromise<any> => {
        const apiEndpoint = apiUrl.concat(url);

        const header = getHeaderRequest();
        const response = axios.delete(apiEndpoint, header);

        validateResponse(response);
        return response;
    },
}

export const validateResponse = (response: AxiosPromise) => {
    response.catch((error: AxiosError) => {
        Alert.alert("Ops...", "Ocorreu eu erro na atualização dos dados. Por favor, tente novamente mais tarde:");
    });
}

export const getHeaderRequest = () => {
    return {
        "headers": {
            "Accept": "application/json"
        }
    } as AxiosRequestConfig
}
