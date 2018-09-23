import React from 'react'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import FoodItemView from './containers/FoodItemView'
import OrderView from './containers/OrderView'
import DeliveryDetails from './containers/DeliveryDetails'
import PaymentDetails from './containers/PaymentDetails'
import OrderConfirmation from './containers/OrderConfirmation'
import { setTopLevelNavigator } from './lib/NavigationServices';

class AppWithNavigationState extends React.PureComponent {
  render() {
    return (
      <AppNavigator
        ref={
          navigatorRef => {
            setTopLevelNavigator(navigatorRef);
          }
        }
      />
    )
  }
}

const AppNavigator = createStackNavigator({
  FoodItemView: {
    screen: FoodItemView,
  },
  OrderView: {
    screen: OrderView,
  },
  DeliveryDetails: {
    screen: DeliveryDetails,
  },
  PaymentDetails: {
    screen: PaymentDetails,
  },
  OrderConfirmation: {
    screen: OrderConfirmation,
  }
})

export default AppWithNavigationState;