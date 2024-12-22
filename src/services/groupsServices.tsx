import { AxiosService } from "./axiosService";

const pathUrl = "/financings-moon/groups";

const GroupsService = {
    create: (payload: object): Promise<any> => {
        return AxiosService.post(pathUrl, payload);
    },

    getAll: () => {
        return AxiosService.get(pathUrl);
    },

    delete: (id: string) => {
        return AxiosService.delete(`${pathUrl}/${id}`);
    }
}

export default GroupsService;