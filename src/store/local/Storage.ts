import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({ id: "general" });

export const getFavoritesStorage = () => {
    const defaultJson = {
        list: [],
        currentWeather: {}
    }

    return JSON.parse(storage.getString("favorites") ?? JSON.stringify(defaultJson))
}