import { create } from 'zustand'
import { WeatherStoreClass } from '../class/WeatherStoreClass';

export type WeatherStore = {
    currentWeather: WeatherStoreClass | null,
    setCurrentWeather: (currentWeather: WeatherStoreClass) => void
}

export const useWeatherStore = create<WeatherStore>()((set) => ({   
    currentWeather: null,
    setCurrentWeather: (currentWeather: WeatherStoreClass) => set({ currentWeather: currentWeather })
}));