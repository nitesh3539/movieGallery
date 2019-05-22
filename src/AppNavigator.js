import React from 'react'

import Application from './containers/MovieListScreen'
import {View, StatusBar} from 'react-native'
import MovieListScreen from '../src/containers/MovieListScreen'

class AppWithNavigationState extends React.PureComponent {
  render() {
    return (
      <View>
      <StatusBar translucent barStyle="light-content" backgroundColor='#4286f4'  />
        <MovieListScreen/>
      </View>
    )
  }
}

export default AppWithNavigationState;