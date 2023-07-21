import { ActionLog, StateLog, types } from "../types/types";

export const authReducer = (
  state: StateLog = {},
  action: ActionLog
): StateLog => {
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
