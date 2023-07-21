import { ActionLog, State, types } from "../types/types";

export const authReducer = (state: State = {}, action: ActionLog): State => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
      };

    case types.logout:
      return {};

    default:
      return state;
  }
};
