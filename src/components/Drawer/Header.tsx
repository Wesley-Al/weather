import React, { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { WeatherStoreClass } from "../../class/WeatherStoreClass";


import SVGMenu from "../../assets/icons/menu.svg";
import SVGStar from "../../assets/icons/star.svg";
import SVGStarFilled from "../../assets/icons/star-filled.svg";
import { useWeatherStore } from "../../store/session/WeatherStore";
import { getFavoritesStorage, storage } from "../../store/local/Storage";

const mobileWidth = Dimensions.get('window').width;
const mobileHeight = Dimensions.get('window').height;

const Header = (props: DrawerHeaderProps) => {
    const navigation = useNavigation();
    const routeName = props.route.name;
    const { currentWeather } = useWeatherStore();
    const [containsList, setContainsList] = useState(false);
    const storageFavorites = getFavoritesStorage();

    const handleAddFavorite = () => {
        updateStorage();
    }

    const getHeader = () => {
        if (routeName === 'Home') {
            return (
                <TouchableOpacity onPress={handleAddFavorite} style={{ ...styles.buttonPrimary, maxWidth: 200 }}>
                    {!containsList && <>
                        <CustomText size={13}>Adicione aos favoritos</CustomText>
                        <SVGStar width="15" height="15" />
                    </>}

                    {containsList && <>
                        <CustomText size={13}>Favoritado</CustomText>
                        <SVGStarFilled width="15" height="15" />
                    </>}
                </TouchableOpacity>);

        } else {
            return (<CustomText>{routeName}</CustomText>);
        }
    }

    const updateStorage = () => {
        const listStorage: Array<WeatherStoreClass> = storageFavorites.list;
        const contains = listStorage.findIndex((x) => x == currentWeather) > -1;

        if (contains) {
            storage.set("favorites", JSON.stringify({
                list:
                    [...listStorage.filter(x => x != currentWeather)]
            }));

            setContainsList(false);
        } else {
            storage.set("favorites", JSON.stringify({ list: [...listStorage, currentWeather] }));
            setContainsList(true);
        }
    }

    const verifyContains = (list: Array<WeatherStoreClass>) => {
        return list.findIndex((x) => x == currentWeather) > -1;
    }

    useEffect(() => {
        const listStorage: Array<WeatherStoreClass> = storageFavorites.list;
        setContainsList(verifyContains(listStorage))
    }, [currentWeather]);

    return (
        <View style={styles.headerPage}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
                <SVGMenu width={24} height={24} />
            </TouchableOpacity>
            {getHeader()}
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
        gap: 10
    },

    headerPage: {
        padding: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        width: mobileWidth
    }
});

export default Header;