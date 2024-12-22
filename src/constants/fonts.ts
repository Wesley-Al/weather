import {Platform} from 'react-native';

const isIOS = () => {
    return Platform.OS === 'ios';
  };

export const fontFamilies = {
    NUNITO: {
        normal: isIOS() ? 'Nunito-Regular' : 'NunitoRegular',
        medium: isIOS() ? 'Nunito-Medium' : 'NunitoMedium',
        bold: isIOS() ? 'Nunito-Bold' : 'NunitoBold',
    }
    // Adjust the above code to fit your chosen fonts' names
};