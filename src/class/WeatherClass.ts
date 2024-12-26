import { WeatherDataClass } from "./WeatherDataClass"
import { WeatherDataDailyClass } from "./WeatherDataDailyClass"
import { WeatherMinutelyClass } from "./WeatherMinutelyClass"

export interface WeatherClass {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: WeatherDataClass,
    minutely: Array<WeatherMinutelyClass>,
    hourly: Array<WeatherDataClass>,
    daily: Array<WeatherDataDailyClass> 
}