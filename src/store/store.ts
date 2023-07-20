import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/authReducer";
import thunk from "redux-thunk";
import { uiReducer } from "../reducers/uiReducer";

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
