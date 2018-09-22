/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
'use strict'
import Reactotron from 'reactotron-react-native'
import { applyMiddleware, createStore } from 'redux' //createStore to be removed

/**
* ## Reducer
* The reducer contains the 4 modules from
* device, global, login, profile
*/
import reducer from './modules/CombineReducer'

export default function configureStore(intialState) {
  return createStore(reducer, intialState) //Redux logger not required But still working here
}

