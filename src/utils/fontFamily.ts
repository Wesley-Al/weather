import { fontFamilies } from '../constants/fonts';

export const getFontFamily = (
    weight: 'normal' | 'medium' | 'bold',
) => {
    const selectedFontFamily = fontFamilies.NUNITO;
    return selectedFontFamily[weight];
};