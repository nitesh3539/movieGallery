import React from 'react'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import FoodItemView from './containers/FoodItemView'
import { setTopLevelNavigator } from './lib/NavigationServices';

class AppWithNavigationState extends React.PureComponent {
  render() {
    return (
        <AppNavigator 
          ref= {
            navigatorRef => {
              setTopLevelNavigator(navigatorRef);
            }
          }
        />
    )
  }
}

const AppNavigator =  createStackNavigator({
    FoodItemView: {
      screen: FoodItemView,
      navigationOptions: {
        gesturesEnabled: false,
        header: null
      }
    },
    // PreloaderScreen: {
    //   screen: Preloader,
    //   navigationOptions: {
    //     gesturesEnabled: false
    //   }
    // },
    // QrCodeScanner: {
    //   screen: QrCodeScanner,
    //   navigationOptions: {
    //     title: 'Scanner',
    //   }
    // },
    // QrCodeScanner: {
    //     screen: QrCodeScanner,
    //     navigationOptions: {
    //       title: 'Scanner',
    //     }
    // },
})

export default AppWithNavigationState;