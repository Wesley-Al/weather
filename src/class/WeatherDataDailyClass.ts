import { WeatherDataClass } from "./WeatherDataClass";

export interface WeatherDataDailyClass extends WeatherDataClass {
    moonrise: number,
    moonset: number,
    moon_phase: number,
    summary: string,
    pressure: number,
    dew_point: number,
    rain: number,
} 