import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/authReducer";
import thunk from "redux-thunk";

// const reducer = combineReducers({
//   auth: authReducer,
// });

export const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
