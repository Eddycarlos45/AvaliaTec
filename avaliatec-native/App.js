import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase'

import TestScreen from './screens/TestScreen.js'

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
      <TestScreen />
    )
  }
}