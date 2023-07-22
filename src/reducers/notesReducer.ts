import { ActionNote, StateNotes, types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (
  state: StateNotes = initialState,
  action: ActionNote
): StateNotes => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
