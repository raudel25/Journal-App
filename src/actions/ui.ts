import { ActionUi, types } from "../types/types";

export const setError = (error: string): ActionUi => ({
  type: types.uiSetError,
  payload: error,
});

export const unSetError = (): ActionUi => ({
  type: types.uiUnSetError,
  payload: "",
});
