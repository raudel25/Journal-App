import { ActionNote, NoteId, StateNotes, types } from "../types/types";

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
        active: action.payload.active
          ? {
              ...action.payload.active,
            }
          : null,
      };

    case types.notesSet:
      return {
        ...state,
        notes: [...action.payload.notes],
      };

    case types.notesUpdated:
      
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.active!.id ? action.payload.active! : note
        ),
      };

    default:
      return state;
  }
};
