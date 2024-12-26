import { useEffect, useState } from "react"
import { getFavoritesStorage, storage } from "../../store/local/Storage"
import CustomText from "../../components/CustomText"
import { ScrollView } from "react-native-gesture-handler"
import { WeatherStoreClass } from "../../class/WeatherStoreClass"
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import SVGTrash from "../../assets/icons/trash.svg"
import WeatherService from "../../services/weatherService"
import { AxiosError, AxiosResponse } from "axios"
import { WeatherClass } from "../../class/WeatherClass"
import { useNavigation } from "@react-navigation/native"
import { useWeatherStore } from "../../store/session/WeatherStore"

export default () => {
    const navigation = useNavigation();
    const { setCurrentWeather } = useWeatherStore();
    const [loading, setLoading] = useState(false);
    const [listFavorites, setListFavorites] = useState<Array<WeatherStoreClass>>([])
    const [listFavoritesDetails, setListFavoritesDetails] = useState<Array<WeatherStoreClass>>([])

    const Text = (props: any) => {
        return <CustomText {...props} color="black">{props.text}</CustomText>
    }

    const convertCelsius = (value: any) => {
        try {
            return `${(value ?? 0).toFixed().toString()}°`;
        } catch (error) {
            return "Valor inoperável";
        };
    }

    const updateListFavorites = () => {
        if (listFavorites.length != 0) {
            setLoading(true);
            listFavorites?.forEach((item: WeatherStoreClass, index) => {
                WeatherService.getList(item.lat, item.lon, "minutely,hourly,daily,alerts").then((response: AxiosResponse<WeatherClass>) => {
                    item.weatherDescription = response.data.current.weather[0].description;
                    item.weatherTemp = convertCelsius(response.data.current.temp);

                    setListFavoritesDetails((payload) => {
                        const list = payload.filter(x => x.cityLabel != item.cityLabel);
                        return [...list, item];
                    })
                }).catch((error: AxiosError) => {
                    Alert.alert("Ops...", `Ocorreu um erro ao atualizar a lista de favoritos: ${error.message}`)
                }).finally(() => {
                    setLoading(false)
                });
            });
        } else {
            setListFavoritesDetails([]);
        }
    }

    const handleSelectCity = (city: WeatherStoreClass) => {
        setCurrentWeather(city);
        navigation.navigate("Home");
    }

    const handleRemoveCity = (itemCity: WeatherStoreClass) => {
        const storageData = getFavoritesStorage();
        const list: Array<WeatherStoreClass> = storageData.list;
        const listWithOut = list.filter((x) => x.cityLabel != itemCity.cityLabel);

        setListFavorites(listWithOut);
        storage.set("favorites", JSON.stringify({
            ...storageData,
            list: listWithOut
        }));
    }

    const listener = storage.addOnValueChangedListener((changedKey) => {
        const newValue = storage.getString(changedKey)

        if (newValue) {
            setListFavorites(JSON.parse(newValue).list);
        }
    })

    useEffect(() => {
        const storageData = getFavoritesStorage();
        setListFavorites(storageData.list);
    }, []);

    useEffect(() => {
        updateListFavorites();

        //Atualiza o clima a cada 5 minutos = 60000 * 5
        const interval = setInterval(() => {
            updateListFavorites();
        }, 5 * 60000);

        return () => {
            clearInterval(interval);
        }
    }, [listFavorites]);

    return (
        <ScrollView style={style.page}>
            <View style={style.content}>
                <View>
                    <Text size={20} text="Lista de favoritos" />
                    <Text size={12} text="Cidades marcadas como favoritas" />
                </View>

                {
                    (listFavoritesDetails?.length == 0 || listFavoritesDetails == null) &&
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%" }}>
                        <Text text="Sua lista esta vazia" />
                    </View>
                }

                {
                    loading && <ActivityIndicator size="large" color={"#3A576F"} />
                }

                {
                    !loading && listFavoritesDetails?.map((item: WeatherStoreClass, index) => {
                        return (
                            <View key={index} style={style.contentCity}>
                                <TouchableOpacity onPress={handleSelectCity.bind(this, item)} style={style.cardButton}>
                                    <View style={{ flex: 1 }}>
                                        <Text numberOfLines={1} text={item.cityLabel} />
                                        <Text style={{ textTransform: "capitalize" }} size={12} text={item.weatherDescription} />
                                    </View>
                                    <CustomText style={style.badgeWeather} size={15} color="#1F249F">{item.weatherTemp}</CustomText>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleRemoveCity.bind(this, item)} style={{ padding: 17, backgroundColor: "white", borderRadius: 60 }}>
                                    <SVGTrash fill={"#E0605A"} width={20} height={20} />
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </View>

        </ScrollView>
    )
}

const style = StyleSheet.create({
    page: {
        flex: 1,
        gap: 5,
        flexDirection: "column",
        backgroundColor: "#F4F4F4",
        padding: 20,
        height: 600
    },

    content: {
        flex: 1,
        gap: 30,
        flexDirection: "column"
    },
    cardButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
        borderRadius: 25,
        padding: 20,
        gap: 20
    },

    contentCity: {
        flex: 1,
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    },

    badgeWeather: {
        borderRadius: 30,
        padding: 5,
        paddingHorizontal: 25,
        backgroundColor: "#F8F8FC"
    }
});