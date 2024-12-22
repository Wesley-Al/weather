import Payment from "@/class/Payment";
import { AxiosService } from "./axiosService";

const pathUrl = "/financings-moon/debts";

const DebtsService = {
    create: (payload: Payment): Promise<any> => {
        return AxiosService.post(pathUrl, payload);
    },

    getExtract: (month: string, year: string) => {
        return AxiosService.get(`${pathUrl}/${month}/${year}`);
    },

    getList: (textValue: string) => {
        return AxiosService.get(`${pathUrl}/list/${textValue}`);
    },

    delete: (id: number) => {
        return AxiosService.delete(`${pathUrl}/${id}`);
    },

    update: (id: number, payload: Payment) => {
        return AxiosService.post(`${pathUrl}/${id}`, payload);
    },

    getByid: (id: number) => { 
        return AxiosService.get(`${pathUrl}/${id}`);
    }
}

export default DebtsService;