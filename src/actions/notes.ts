import { db, collection, addDoc } from "../firebase/firebase-config";
import { AppDispatch } from "../store/store";
import { ActionNote, Note, types } from "../types/types";

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
    ...note,
    id: id,
  },
});
