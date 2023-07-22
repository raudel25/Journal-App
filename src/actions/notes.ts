import Swal from "sweetalert2";
import {
  db,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "../firebase/firebase-config";
import { AppDispatch, RootState } from "../store/store";
import { noteIdToNote } from "../types/convert";
import { ActionNote, Note, NoteId, types } from "../types/types";

export const startNewNote = () => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const uid = getState().auth.uid;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    addDoc(collection(db, `${uid}/journal/notes`), newNote)
      .then((doc) => {
        dispatch(activateNote(newNote, doc.id));
        dispatch(addNote(newNote, doc.id));
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };
};

export const addNote = (note: Note, id: string): ActionNote => ({
  type: types.notesAddNew,
  payload: {
    notes: [],
    note: {
      ...note,
      id: id,
    },
  },
});

export const activateNote = (note: Note, id: string): ActionNote => ({
  type: types.notesActive,
  payload: {
    notes: [],
    note: {
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
    loadNotes(uid)
      .then((notes) => {
        dispatch(setNotes(notes));
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

export const setNotes = (notes: Array<NoteId>): ActionNote => ({
  type: types.notesSet,
  payload: { notes, note: null },
});

export const startSaveNote = (note: NoteId) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const uid = getState().auth.uid;

    if (!note.imgUrl) {
      delete note.imgUrl;
    }

    const noteToFirestore = noteIdToNote(note);

    updateDoc(doc(db, `${uid}/journal/notes/${note.id}`), noteToFirestore)
      .then(() => {
        dispatch(refreshNote(note));
        Swal.fire("Save", note.title, "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };
};

export const refreshNote = (note: NoteId): ActionNote => ({
  type: types.notesUpdated,
  payload: { notes: [], note },
});
