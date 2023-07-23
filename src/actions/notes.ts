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
import { title } from "process";
import { text } from "stream/consumers";

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

export const cleaningNotes = (): ActionNote => ({
  type: types.notesLogoutCleaning,
  payload: { notes: [], note: null },
});

const fileUpload = async (file: File) => {
  const url = "https://api.cloudinary.com/v1_1/dq4qw7ibj/upload";

  const formData = new FormData();
  formData.append("upload_preset", "journal-app");
  formData.append("file", file);

  try {
    const resp = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (resp.ok) {
      const couldResp = await resp.json();

      return couldResp.secure_url;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw error;
  }
};

export const startUploading =
  (file: File) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { active } = getState().notes;

    Swal.showLoading();
    // Swal.fire({
    //   title: "Uploading...",
    //   text: "Please Wait",
    //   allowOutsideClick: false,
    // });

    fileUpload(file)
      .then((url) => {
        dispatch(startSaveNote({ ...active!, imgUrl: url }));

        Swal.close();
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };
