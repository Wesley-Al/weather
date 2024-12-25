import * as React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator, DrawerHeaderProps, DrawerNavigationOptions } from '@react-navigation/drawer';
import { DefaultTheme, DrawerActions, NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

import { SafeAreaView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Home from './pages/home';
import CustomText from './components/CustomText';
import SVGStar from "./assets/icons/star.svg";
import SVGMenu from "./assets/icons/menu.svg";
import MyDrawer from './components/Drawer';
import { getFontFamily } from './utils/fontFamily';

const Drawer = createDrawerNavigator();
const mobileWidth = Dimensions.get('window').width;
const mobileHeight = Dimensions.get('window').height;

export default function App() {

  const HeaderComponent = (props: DrawerHeaderProps) => {
    const navigation = useNavigation();
    const routeName = props.route.name;
    let itemHeader;

    if (routeName === 'Home') {
      itemHeader = (<TouchableOpacity style={{ ...styles.buttonPrimary, maxWidth: 200 }}>
        <CustomText size={13}>Adicione aos favoritos</CustomText>
        <SVGStar width="15" height="15" />
      </TouchableOpacity>);

    } else {
      itemHeader = (<CustomText>{routeName}</CustomText>);
    }

    return (
      <View style={styles.headerPage}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
          <SVGMenu width={24} height={24} />
        </TouchableOpacity>
        {itemHeader}
      </View>
    )
  }

  const PageTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'black',
    },
  };

  const confiDrawer: DrawerNavigationOptions = {
    header: HeaderComponent,
    drawerStyle: {
      backgroundColor: "rgba(0, 0, 0, 0.31)",
      borderTopEndRadius: 30,
      borderBottomEndRadius: 30,
      shadowRadius: 1,
      width: "70%",
      maxWidth: 300
    },
    drawerActiveBackgroundColor: "rgba(58,87,111,0.66)",
    drawerActiveTintColor: "#FFFFFF",

    drawerInactiveBackgroundColor: "rgba(0, 0, 0, 0.56)",
    drawerInactiveTintColor: "#FFFFFF",
    drawerLabelStyle: {
      height: 19,
      fontSize: 14,
      fontFamily: getFontFamily("normal")
    },
    drawerItemStyle: {
      padding: 0,
      marginTop: 15
    }
  };

  return (
    <NavigationContainer theme={PageTheme}>
      <Drawer.Navigator drawerContent={(props) => <MyDrawer {...props} />}
        screenOptions={confiDrawer}
        initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Lista de favoritos" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
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
    gap: 10
  },

  headerPage: {
    padding: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    width: mobileWidth
  }
});