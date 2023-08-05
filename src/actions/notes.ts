import Swal from "sweetalert2";
import { AppDispatch, RootState } from "../store/store";
import { ActionNote, Note, NoteId, types } from "../types/types";
import { supabase } from "../supabase/client";

export const startNewNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const idUser = getState().auth.uid;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const { data, error } = await supabase
      .from("notes")
      .insert({ ...newNote, id_user: idUser })
      .select();

    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }

    dispatch(addNote(newNote, data![0].id));
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
  const notes: Array<NoteId> = [];

  const { data: notesSnap, error } = await supabase
    .from("notes")
    .select()
    .eq("id_user", uid);

  if (error) {
    throw error.message;
  }

  notesSnap!.forEach((note) => {
    notes.push({
      id: note.id,
      title: note.title,
      body: note.body,
      date: note.date,
      imgUrl: note.imgUrl ? note.imgUrl : undefined,
    } as NoteId);
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
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const idUser = getState().auth.uid;

    if (!note.imgUrl) {
      delete note.imgUrl;
    }

    const { error } = await supabase
      .from("notes")
      .update({ ...note, id_user: idUser })
      .eq("id", note.id);

    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }

    dispatch(refreshNote(note));
    Swal.fire("Save", note.title, "success");
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

    fileUpload(file)
      .then((url) => {
        dispatch(startSaveNote({ ...active!, imgUrl: url }));

        Swal.close();
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

export const startDelete = (note: NoteId) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { error } = await supabase.from("notes").delete().eq("id", note.id);
    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }
    dispatch(deleteNote(note));
  };
};

export const deleteNote = (note: NoteId): ActionNote => ({
  type: types.notesDeleted,
  payload: { note, notes: [] },
});
