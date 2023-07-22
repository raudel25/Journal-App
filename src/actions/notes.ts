import { db, collection, addDoc, getDocs } from "../firebase/firebase-config";
import { AppDispatch } from "../store/store";
import { ActionNote, Note, NoteId, types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch: AppDispatch, getState: any) => {
    const uid = getState().auth.uid;

    const newNote = {
      title: "",
      body: "",
      imgUrl: "",
      date: new Date().getTime(),
    };

    const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote);

    dispatch(activateNote(newNote, doc.id));
  };
};

export const activateNote = (note: Note, id: string): ActionNote => ({
  type: types.notesActive,
  payload: {
    notes: [],
    active: {
      ...note,
      id: id,
    },
  },
});

const loadNotes = async (uid: string) => {
  const notesSnap = await getDocs(collection(db, `${uid}/journal/notes`));
  const notes: Array<NoteId> = [];

  notesSnap.forEach((note) => {
    notes.push({ id: note.id, ...note.data() } as NoteId);
  });

  return notes;
};

export const startLoadingNotes =
  (uid: string) => async (dispatch: AppDispatch) => {
    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };

export const setNotes = (notes: Array<NoteId>): ActionNote => ({
  type: types.notesSet,
  payload: { notes, active: null },
});
