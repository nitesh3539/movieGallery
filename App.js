// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

import React, { PureComponent } from "react";
import {
  View,
  Dimensions,
  WebView,
  ToastAndroid,
  NativeModules,
  AsyncStorage
} from "react-native";
import { Provider } from 'react-redux'
import configureStore from './src/configureStore'
import AppWithNavigationState from './src/AppNavigator'


export default class App extends PureComponent {
  /// CLASS METHODS ///
  render() {
    return (
    <Provider store={configureStore({})}>
    <AppWithNavigationState />
  </Provider>
    )
}
}