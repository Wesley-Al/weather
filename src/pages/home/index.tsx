import type { PropsWithChildren } from 'react';
import React, { useEffect, useState } from 'react';
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

type SectionProps = PropsWithChildren<{
    title: string;
}>;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [imageWeather, setImageWeather] = useState();
    const [currentCity, setCurrentCity] = useState<WeatherClass>();

    const navigation = useNavigation();

    const handleAddFavorite = () => {
        setImageWeather(require("../../assets/wallpaper-weather/light/rain.jpg"));
    }

    const handleSelectCity = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
        const geometryLocation = details?.geometry.location;

        if (geometryLocation != null) {
            WeatherService.getList(geometryLocation.lat, geometryLocation.lng)
                .then((response: AxiosResponse) => setCurrentCity(response.data))
                .catch((error: AxiosError) => {
                    Alert.alert("Ops...", "Ocorreu um erro na pesquisa")
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
            if (max) {
                return getMaxCelsius(arrayHoursWeather);
            } else {
                return getMinCelsius(arrayHoursWeather);
            }
        } else {
            { temp: 0 }
        }
    }

    useEffect(() => {
        setImageWeather(require("../../assets/wallpaper-weather/light/sunny.jpg"));

        console.log(currentCity);
    }, [currentCity]);

    return (
        <View style={{ backgroundColor: "black" }}>
            <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollContent}>
                <View style={styles.content}>

                    <View style={{ flex: 1, flexDirection: "column", gap: 2 }}>
                        <CustomText size={37}>{convertCelsius(currentCity?.current.temp)}</CustomText>
                        <CustomText style={{ textTransform: "capitalize" }}>{new Date().toLocaleString("pt-Br", {
                            timeStyle: "short",
                            timeZone: currentCity?.timezone
                        })} {currentCity?.current.weather[0].description}</CustomText>
                    </View>

                    <View style={{ flex: 1, flexDirection: "column", gap: 15 }}>
                        <CustomText>{convertCelsius(peakCelsius(true, currentCity?.hourly)?.temp)} / {convertCelsius(peakCelsius(false, currentCity?.hourly)?.temp)} Sensação térmica de {convertCelsius(currentCity?.current.feels_like)}</CustomText>
                        <GoogleInput handleSelectCity={handleSelectCity} />
                    </View>
                </View>
            </ScrollView>
            <ImageBackground style={{
                width: width,
                height: height,
                opacity: 0.52,
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