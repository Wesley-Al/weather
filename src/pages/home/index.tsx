import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    Alert,
    Button,
    Dimensions,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { getFontFamily } from '../../utils/fontFamily';
import CustomText from '../../components/CustomText';

import SVGStar from "../../assets/icons/star.svg";
import SVGMenu from "../../assets/icons/menu.svg";

type SectionProps = PropsWithChildren<{
    title: string;
}>;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [imageWeather, setImageWeather] = useState();

    const handleAddFavorite = () => {
        setImageWeather(require("../../assets/wallpaper-weather/light/rain.jpg"));
    }
    useEffect(() => {
        setImageWeather(require("../../assets/wallpaper-weather/light/sunny.jpg"));
    }, [])

    const HeaderPage = () => {
        return (
            <View style={styles.headerPage}>
                <TouchableOpacity onPress={handleAddFavorite}>
                    <SVGMenu width={24} height={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddFavorite}>
                    <View style={styles.buttonPrimary}>
                        <CustomText>Adicione aos favoritos</CustomText>
                        <SVGStar width="19" height="19" />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <ScrollView style={styles.content}>
                <HeaderPage />

                <View>
                    <View>
                        <CustomText size={37}>28°</CustomText>
                        <CustomText>11:02 Ensolarado</CustomText>
                    </View>
                    <CustomText>28° / 22° Sensação térmica de 31°</CustomText>
                </View>
            </ScrollView>
            <ImageBackground style={{ width: width, height: height, opacity: 0.52, position: 'absolute', zIndex: 0 }} source={imageWeather} />
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