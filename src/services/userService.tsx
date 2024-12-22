import { AxiosService } from "./axiosService";

const pathUrl = "/financings-moon/perfil";

const UserService = {
    update: (payload: object): Promise<any> => {
        return AxiosService.post(`${pathUrl}/update`, payload);
    }
}

export default UserService;