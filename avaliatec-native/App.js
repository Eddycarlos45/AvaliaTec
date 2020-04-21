import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase'

import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200EE',
    accent: '#6265ff',
  },
};

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoadingComplete: false,
    }

    // Initialize Firebase
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig) }
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        <HomeScreen />
      </PaperProvider>
    )
  }
}