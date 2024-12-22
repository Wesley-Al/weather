/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './pages/home';
import { getFontFamily } from './utils/fontFamily';
import CustomText from './components/CustomText';

import SVGStar from "./assets/icons/star.svg";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const backgroundStyle = {
    backgroundColor: Colors.darker,
    color: "white"
  
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView style={{ width: width, height: height }}>
        <View>
          <TouchableOpacity>
            <CustomText>Adicione a cidade na sua lista de favoritos</CustomText>
            
          </TouchableOpacity>
          <SVGStar width="100%" height="100%"/>
        </View>
      </ScrollView>
      <ImageBackground style={{ width: width, height: height, opacity: 0.52, position: 'absolute' }} source={require("./assets/1680.jpg")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
