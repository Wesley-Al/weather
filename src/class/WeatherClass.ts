import { WeatherMinutelyClass } from "./WeatherMinutelyClass"
import { WeatherDataClass } from "./WeatherDataClass"
import { WeatherDataDailyClass } from "./WeatherDataDailyClass"

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