import { StateNotes } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (
  state: StateNotes = initialState,
  action: any
): StateNotes => {
  switch (action.type) {
    default:
      return state;
  }
};
