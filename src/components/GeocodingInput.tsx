import { TOKEN_GEOLOCATION_GOOGLE } from "@env";
import React, { useEffect, useState } from 'react';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, GooglePlacesAutocompleteProps } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import CustomText from './CustomText';
import { getFontFamily } from '../utils/fontFamily';
import { storage } from "../store/local/Storage";
import { WeatherStoreClass } from "../class/WeatherStoreClass";

export interface GooglePlacesInputProps extends GooglePlacesAutocompleteProps {
    handleSelectCity: (data: GooglePlaceData, details: GooglePlaceDetail | null) => void
}

const GooglePlacesInput = (props: GooglePlacesInputProps) => {
    const [inputFocus, setInputFocus] = useState(false);
    const [listFavorites, setListFavorites] = useState<Array<any>>([]);

    const handleChange = (text: string) => {
        return text;
    }

    const renderOption = (data: GooglePlaceData, index: number) => {
        return (
            <CustomText>{data.description}</CustomText>
        );
    }

    const listener = storage.addOnValueChangedListener((changedKey) => {
        const newValue = storage.getString(changedKey)

        if (newValue) {
            updateList(newValue);
        }
    })

    const updateList = (storageValue: string) => {
        const list: Array<WeatherStoreClass> = JSON.parse(storageValue).list;

        setListFavorites(list.map((item) => {
            return {
                description: item.cityLabel,
                geometry: { location: { lat: item.lat, lng: item.lon } },
            }
        }));
    }

    useEffect(() => {
        updateList(storage.getString("favorites") ?? "{}");
    }, []);

    return (
        <GooglePlacesAutocomplete
            {...props}
            predefinedPlaces={listFavorites}
            preProcess={handleChange}
            placeholder='Pesquisar...'
            onPress={props.handleSelectCity}
            query={{
                key: TOKEN_GEOLOCATION_GOOGLE,
                language: 'pt-BR',
            }}
            fetchDetails={true}
            listViewDisplayed={false}
            renderRow={renderOption}
            textInputProps={{
                onBlur: () => {
                    setInputFocus(false)
                },
                onFocus: () => {
                    setInputFocus(true);
                }
            }}
            styles={
                /*predefinedPlaces={[homePlace, workPlace]} */
                {
                    textInput: {
                        color: 'white',
                        backgroundColor: 'transparent',
                        fontFamily: getFontFamily("normal"),
                        textAlign: "center"
                    },
                    container: {
                        borderTopEndRadius: 0,
                    },

                    listView: {
                        marginTop: 5,
                        backgroundColor: "transparent",
                        borderRadius: 15,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        color: 'white',
                    },

                    row: {
                        backgroundColor: 'rgba(255,255,255,0.17)',
                        color: 'white'
                    },

                    poweredContainer: {
                        display: "none"
                    },

                    textInputContainer: {
                        transition: "all 1s",
                        borderRadius: inputFocus ? 17 : 60,
                        borderBottomEndRadius: inputFocus ? 0 : 60,
                        borderBottomStartRadius: inputFocus ? 0 : 60,
                        overflow: "hidden",
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.17)',
                        paddingHorizontal: 10
                    },
                    separator: {
                        display: "none"
                    }
                }
            }
        />
    );
};

export default GooglePlacesInput;