import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/authReducer";
import thunk from "redux-thunk";
import { useDispatch } from "react-redux";
import { uiReducer } from "../reducers/uiReducer";

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
