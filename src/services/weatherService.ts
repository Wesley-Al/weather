import { AxiosService } from "./axiosService";
import { TOKEN_OPEN_WEATHER } from '@env';

const WeatherService = {
    getList: (lat: number, long: number, exclude?: string) => {
        return AxiosService.get(`?lat=${lat}&lon=${long}&appid=${TOKEN_OPEN_WEATHER}&exclude=${exclude}&lang=pt_br&units=metric`);
    }    
}

export default WeatherService;