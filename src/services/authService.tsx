import DataAuthenticate from "@/class/DataAuthenticate";
import { AxiosService } from "./axiosService";
import { AxiosPromise } from "axios";

const pathUrl = "/auth";

const AuthService = {
    authenticate: (data: DataAuthenticate): AxiosPromise => {
        return AxiosService.post(`${pathUrl}/login`, data, false);
    },

    logout: () => {
        AxiosService.post(`${pathUrl}/logout`, null).then(() => {
            console.log("logout");
        });

        window.localStorage.clear();
        window.location.pathname = "/";
    }
}

export default AuthService;