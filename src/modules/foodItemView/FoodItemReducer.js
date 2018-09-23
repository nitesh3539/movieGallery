'use strict'

import InitialState from './FoodItemInitialState'
const initialState = new InitialState()
import { SET_DATA_IN_FOODITEM_LIST } from '../../lib/Constants'

export default function statistics(state = initialState, action) {
    switch (action.type) {
        case SET_DATA_IN_FOODITEM_LIST:
            return state.set('foodItemList', action.payload)
    }
    return state
}