'use strict'

import InitialState from './OrderViewInitialState'
const initialState = new InitialState()
import { SET_DATA_IN_CARTITEM_LIST, SET_LOADER_FOR_ORDER_VIEW } from '../../lib/Constants'


export default function statistics(state = initialState, action) {
    switch (action.type) {
        case SET_DATA_IN_CARTITEM_LIST:
            return state.set('cartItemList', action.payload)
                        .set('loader', false)
        case SET_LOADER_FOR_ORDER_VIEW:
            return state.set('loader', action.payload)
    }
    return state
}