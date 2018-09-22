'use strict'
 
import InitialState from './FoodItemInitialState' 
const initialState = new InitialState()

export default function statistics(state = initialState, action) {
    switch (action.type) {
        case 'SET_DATA_IN_STATISTICS_LIST':
            return state.set('sortingDetails', action.payload)
        case 'RESET_STATE':
            return initialState

    }
    return state
}