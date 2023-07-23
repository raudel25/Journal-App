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
        active: action.payload.note
          ? {
              ...action.payload.note,
            }
          : null,
      };

    case types.notesAddNew:
      return {
        ...state,
        notes: [...state.notes].concat([action.payload.note!]),
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
          note.id === action.payload.note!.id ? action.payload.note! : note
        ),
      };

    case types.notesLogoutCleaning:
      return {
        notes: [],
        active: null,
      };

    default:
      return state;
  }
};
