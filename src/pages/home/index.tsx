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
import GoogleInput from '../../components/GeocodingInput'

import { useNavigation } from '@react-navigation/native';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [imageWeather, setImageWeather] = useState();

    const navigation = useNavigation();

    const handleAddFavorite = () => {
        setImageWeather(require("../../assets/wallpaper-weather/light/rain.jpg"));
    }
    useEffect(() => {
        setImageWeather(require("../../assets/wallpaper-weather/light/sunny.jpg"));
    }, [])



    return (
        <View style={{ backgroundColor: "black" }}>
            <ScrollView style={styles.scrollContent}>
                <View style={styles.content}>
                    <View style={{ flex: 1, flexDirection: "column", gap: 2 }}>
                        <CustomText size={37}>28°</CustomText>
                        <CustomText>11:02 Ensolarado</CustomText>
                    </View>

                    <View style={{ flex: 1, flexDirection: "column", gap: 15 }}>
                        <CustomText>28° / 22° Sensação térmica de 31°</CustomText>
                        <GoogleInput />
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