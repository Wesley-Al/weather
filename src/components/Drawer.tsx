import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import CustomText from './CustomText';
import SVGMenu from "../assets/icons/menu.svg";
import { DrawerActions } from '@react-navigation/native';
import { View } from 'react-native';

function MyDrawer(props: any) {
  const GreetingItem = (labelConfig: any) => {
    return (
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
        <CustomText style={{ alignSelf: "center" }}>Bem vindo!</CustomText>
        <SVGMenu width={24} height={24} />
      </View>
    )
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        pressColor='transparent'
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
        label={(config) => <GreetingItem labelConfig={config} />} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default MyDrawer;