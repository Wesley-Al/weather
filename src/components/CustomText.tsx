import { Text, TextStyle } from "react-native";
import { getFontFamily } from "../utils/fontFamily";

const CustomText = (props: { children: string, size?: number, color?: string, style?: TextStyle }) => {
    return (
        <Text style={{
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