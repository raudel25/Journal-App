import { Action, State, types } from "../types/types";

export const authReducer = (state: State = {}, action: Action): State => {
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
