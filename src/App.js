import React, { PureComponent } from "react";
import {
  View,
  Dimensions,
  WebView,
  ToastAndroid,
  NativeModules,
  AsyncStorage
} from "react-native";
import configureStore from './src/configureStore'
import AppWithNavigationState from './AppNavigator'


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
