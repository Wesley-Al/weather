import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';

import MyDrawer from './components/Drawer';
import Header from './components/Drawer/Header';
import Favorites from './pages/favorites';
import Home from './pages/home';
import { getFontFamily } from './utils/fontFamily';

const Drawer = createDrawerNavigator();

export default function App() { 
  const PageTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'black',
    },
  };

  const configDrawer: DrawerNavigationOptions = {
    header: Header,
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
        screenOptions={configDrawer}
        initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Lista de favoritos" component={Favorites} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}