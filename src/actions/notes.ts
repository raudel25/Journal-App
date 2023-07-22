import {
  db,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "../firebase/firebase-config";
import { AppDispatch } from "../store/store";
import { noteIdToNote } from "../types/convert";
import { ActionNote, Note, NoteId, types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch: AppDispatch, getState: any) => {
    const uid = getState().auth.uid;

    const newNote = {
      title: "",
      body: "",
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

export const startSaveNote = (note: NoteId) => {
  return async (_: AppDispatch, getState: any) => {
    const uid = getState().auth.uid;

    if (!note.imgUrl) {
      delete note.imgUrl;
    }

    const noteToFirestore = noteIdToNote(note);

    await updateDoc(
      doc(db, `${uid}/journal/notes/${note.id}`),
      noteToFirestore
    );
  };
};
