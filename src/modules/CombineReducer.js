'use strict'
import { combineReducers } from 'redux'

import FoodItemReducer from './foodItemView/FoodItemReducer'
import OrderViewReducer from './orderView/OrderViewReducer'

const rootReducer = combineReducers({
    FoodItemReducer,
    OrderViewReducer,
})
export default rootReducer