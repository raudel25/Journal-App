import { ActionUi, types } from "../types/types";

export const setError = (error: string): ActionUi => ({
  type: types.uiSetError,
  payload: error,
});

export const unSetError = (): ActionUi => ({
  type: types.uiUnSetError,
  payload: null,
});

export const startLoading = (): ActionUi => ({
  type: types.startLoading,
  payload: null,
});

export const endLoading = (): ActionUi => ({
  type: types.endLoading,
  payload: null,
});
