'use strict'

import InitialState from './MovieDetailsInitialState'
const initialState = new InitialState()
import { SET_MOVIE_DETAILS_LIST, SET_LOADER } from '../../lib/Constants'


export default function profileDetailsReducer(state = initialState, action) {
    switch (action.type) {

        case SET_MOVIE_DETAILS_LIST:
            return state.set('movieDetailsList', action.payload)
                        .set('loader', false)    

        case SET_LOADER:
            return state.set('loader', action.payload)
            
    }
    return state
}

