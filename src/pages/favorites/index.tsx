import { useEffect, useState } from "react"
import { storage } from "../../store/local/Storage"
import CustomText from "../../components/CustomText"
import { ScrollView } from "react-native-gesture-handler"
import { WeatherStoreClass } from "../../class/WeatherStoreClass"

export default () => {
    const [listFavorites, setListFavorites] = useState<Array<WeatherStoreClass>>([])

    useEffect(() => {
        const interval = setInterval(() => {
            const storageData = JSON.parse(storage.getString("favorites") ?? "{}");
            setListFavorites(storageData.list);
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <ScrollView>
            {listFavorites?.map((item, index) => {
                return (<CustomText key={index}>{item.cityLabel ?? ""}</CustomText>)
            })}
        </ScrollView>
    )
}