/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
"use strict";
import { createStore } from "redux"; //createStore to be removed

import reducer from "./modules/CombineReducer";

export default function configureStore(intialState) {
  return createStore(reducer, intialState); //Redux logger not required But still working here
}
