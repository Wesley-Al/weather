import type { PropsWithChildren } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    ImageBackground,
    ScrollView,
    StyleSheet,
    useColorScheme,
    View
} from 'react-native';

import CustomText from '../../components/CustomText';
import GoogleInput from '../../components/GeocodingInput';

import { useNavigation } from '@react-navigation/native';
import { AxiosError, AxiosResponse } from 'axios';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import WeatherService from '../../services/weatherService';
import { WeatherDataClass } from '../../class/WeatherDataClass';
import { WeatherClass } from '../../class/WeatherClass';
import { WeatherDataHourlyClass } from '../../class/WeatherDataHourlyClass';
import { useWeatherStore } from '../../store/session/WeatherStore';
import { storage } from '../../store/local/Storage';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [imageWeather, setImageWeather] = useState();
    const [currentCity, setCurrentCity] = useState<WeatherClass>();
    const [currentHours, setCurrentHours] = useState("");
    const { setCurrentWeather, currentWeather } = useWeatherStore();

    const navigation = useNavigation();

    const handleAddFavorite = () => {
        setImageWeather(require("../../assets/wallpaper-weather/light/rain.jpg"));
    }

    const handleSelectCity = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
        const geometryLocation = details?.geometry.location;

        if (geometryLocation != null) {
            getWeather(geometryLocation.lat, geometryLocation.lng, (response) => {
                setCurrentWeather({
                    lat: response.data.lat,
                    lon: response.data.lon,
                    cityLabel: data.description
                });

                setCurrentCity(response.data);
            });
        }
    }

    const convertCelsius = (value: any) => {
        try {
            return `${(value ?? 0).toFixed().toString()}°`;
        } catch (error) {
            return "Valor inoperável";
        };
    }

    const getMinCelsius = (arrayHoursWeather: Array<WeatherDataHourlyClass>) => {
        return arrayHoursWeather.reduce((a, b) => {
            const prevTemp = a.temp ?? 0;
            const nextTemp = b.temp ?? 0;

            return prevTemp < nextTemp && prevTemp != 0 ? a : b;
        }, {} as WeatherDataHourlyClass);
    }

    const getMaxCelsius = (arrayHoursWeather: Array<WeatherDataHourlyClass>) => {
        return arrayHoursWeather.reduce((a, b) => {
            const prevTemp = a.temp ?? 0;
            const nextTemp = b.temp ?? 0;

            return prevTemp > nextTemp ? a : b;
        }, {} as WeatherDataHourlyClass);
    }

    const peakCelsius = (max: boolean, arrayHoursWeather: Array<WeatherDataHourlyClass>) => {
        if (arrayHoursWeather != null) {
            const listHours = arrayHoursWeather.slice(0, 12);

            if (max) {
                return getMaxCelsius(listHours);
            } else {
                return getMinCelsius(listHours);
            }
        } else {
            { temp: 0 }
        }
    }

    useEffect(() => {
        setImageWeather(require("../../assets/wallpaper-weather/light/sunny.jpg"));

        const interval = setInterval(() => {
            setCurrentHours(new Date().toLocaleString("pt-Br", {
                timeStyle: "short",
                timeZone: currentCity?.timezone
            }));
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [currentCity]);

    const getWeather = (lat: number, long: number, callback: (response: AxiosResponse<WeatherClass>) => void) => {
        WeatherService.getList(lat, long)
            .then((response: AxiosResponse<WeatherClass>) => {
                callback(response);
            })
            .catch((error: AxiosError) => {
                Alert.alert("Ops...", "Ocorreu um erro na pesquisa")
            });
    }

    useEffect(() => {
        if (currentWeather != null) {
            getWeather(currentWeather.lat, currentWeather.lon, (response) => {
                setCurrentCity(response.data);
            });
        }
    }, [currentWeather])

    return (
        <View style={{ backgroundColor: "black" }}>
            <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollContent}>
                <View style={styles.content}>

                    <View style={{ flex: 1, flexDirection: "column", gap: 2 }}>
                        <CustomText size={37}>{convertCelsius(currentCity?.current.temp)}</CustomText>
                        <CustomText style={{ textTransform: "capitalize" }}>{currentHours} {currentCity?.current.weather[0].description}</CustomText>
                    </View>

                    <View style={{ flex: 1, flexDirection: "column", gap: 15 }}>
                        <CustomText>{convertCelsius(peakCelsius(true, currentCity?.hourly)?.temp)} / {convertCelsius(peakCelsius(false, currentCity?.hourly)?.temp)} Sensação térmica de {convertCelsius(currentCity?.current.feels_like)}</CustomText>
                        <GoogleInput currentLocationLabel={currentWeather?.cityLabel} handleSelectCity={handleSelectCity} />
                    </View>
                </View>
            </ScrollView>
            <ImageBackground style={{
                width: width,
                height: height,
                opacity: 0.35,
                position: 'absolute',
                zIndex: 0,
                top: -120

            }} source={imageWeather} />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonPrimary: {
        backgroundColor: "rgba(255, 255, 255, 0.17)",
        borderRadius: 50,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        paddingHorizontal: 20,
        gap: 15
    },
    content: {
        flex: 1,
        gap: 30,
        flexDirection: "column"
    },

    scrollContent: {
        width: width,
        height: height,
        zIndex: 100,
        padding: 20,
        paddingVertical: 30
    },

    headerPage: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20
    }
});