import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "../reducers/authReducer";
import { Action, State } from "../types/types";

// const reducer = combineReducers({
//   auth: authReducer,
// });

export const store = configureStore({
  reducer: {auth:authReducer},
});
