import { Text, TextStyle } from "react-native";
import { getFontFamily } from "../utils/fontFamily";
import { ReactNode } from "react";

const CustomText = (props: { children: string | undefined | null, numberOfLines?: number, size?: number, color?: string, style?: TextStyle }) => {
    return (
        <Text 
        numberOfLines={props.numberOfLines}
        style={{
            ...props.style,
            color: props.color ?? "white",
            fontSize: props.size ?? 17,
            fontFamily: getFontFamily("normal")
        }}>
            {props.children}
        </Text>
    )
}

export default CustomText;