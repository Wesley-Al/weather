import { FeelsLikeClass } from "./FeelsLikeClass";
import { TempWeather } from "./TempWeatherClass";
import { WeatherResumeClass } from "./WeatherResumeClass";

export interface WeatherDataClass {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number | TempWeather,
    feels_like: number | FeelsLikeClass,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: Array<WeatherResumeClass>,
    pop: number | null,
} 