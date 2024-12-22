/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './global.css';
import React from 'react';
import { SafeAreaView } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Home from './src/pages/home';

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.darker
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Home />
    </SafeAreaView>
  );
}

export default App;
