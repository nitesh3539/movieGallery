'use strict'
import { combineReducers } from 'redux'

import DeliveryDetailReducer from './delivery-details/DeliveryDetailReducer'
import FoodItemReducer from './foodItemView/FoodItemReducer'
import OrderConfirmationReducer from './order-confirmation/OrderConfirmationReducer'
import OrderViewReducer from './orderView/OrderViewReducer'
import PaymentDetailsReducer from './payment-details/PaymentDetailsReducer'

const  rootReducer = combineReducers({
    DeliveryDetailReducer,
    FoodItemReducer,
    OrderConfirmationReducer,
    OrderViewReducer,
    PaymentDetailsReducer
})
export default rootReducer