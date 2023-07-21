import { ActionUi, StateUi, types } from "../types/types";

const initialState = {
  loading: false,
  msgError: "",
};

export const uiReducer = (
  state: StateUi = initialState,
  action: ActionUi
): StateUi => {
  switch (action.type) {
    case types.uiSetError:
      return { ...state, msgError: action.payload };

    case types.uiUnSetError:
      return { ...state, msgError: null };

    case types.startLoading:
      return { ...state, loading: true };

    case types.endLoading:
      return { ...state, loading: false };

    default:
      return state;
  }
};
