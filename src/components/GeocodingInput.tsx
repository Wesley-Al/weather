import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import CustomText from './CustomText';
import { getFontFamily } from '../utils/fontFamily';

const GooglePlacesInput = () => {
    const [inputFocus, setInputFocus] = useState(false);
    const [currentCity, setCurrentCity] = useState({
        data: {} as GooglePlaceData,
        details: {} as GooglePlaceDetail | null
    })
    const homePlace = {
        description: 'Home',
        geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
    };
    const workPlace = {
        description: 'Work',
        geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
    };

    const handleChange = (text: string) => {
        return text;
    }

    const renderOption = (data: GooglePlaceData, index: number) => {
        return (
            <CustomText style={{}}>{data.description}</CustomText>
        );
    }

    return (

        <GooglePlacesAutocomplete
            preProcess={handleChange}
            placeholder='Pesquisar...'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                debugger;
                console.log(data, details);
                setCurrentCity({
                    data: data, 
                    details: details
                })
            }}
            query={{
                key: 'AIzaSyCGK4iT4aiS3C79y9AjwDhUyy-QHG46Nxc',
                language: 'pt-BR',
            }}
            
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
                        fontFamily: getFontFamily("normal")
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