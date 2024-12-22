import UserInfo from "@/class/UserInfo";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

//const apiUrl = "https://api-template.moontec.me/api";
const apiUrl = "http://localhost:8000/api";

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
    response.catch((error) => {
        if(error.response.status == 401) {
            window.localStorage.removeItem("userInfo");
            window.location.pathname = "/";
        }
    });
}

export const getTokenUser = () => {
    const user = JSON.parse(window.localStorage.getItem("userInfo") ?? "{}") as UserInfo;
    return user.token;
}

export const getHeaderRequest = () => {
    return {
        "headers": {
            "Accept": "application/json",
            "Authorization": `Bearer ${getTokenUser()}`
        }        
    } as AxiosRequestConfig
}
