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
      return { ...state, msgError: "" };

    default:
      return state;
  }
};
