import { Text, TextStyle } from "react-native";
import { getFontFamily } from "../utils/fontFamily";

const CustomText = (props: { children: string, style?: TextStyle }) => {
    return (
        <Text style={{
            ...props.style,
            color: "white",
            fontSize: 17,
            fontFamily: getFontFamily("normal")
        }}>
            {props.children}
        </Text>
    )
}

export default CustomText;