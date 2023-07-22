export type ActionLog = {
  type: string;
  payload: { uid: string; displayName: string | null };
};

export type ActionUi = {
  type: string;
  payload: string | null;
};

export type ActionNote = {
  type: string;
  payload: NoteId;
};

export type StateLog = { uid?: string; displayName?: string | null };
export type StateUi = { loading: boolean; msgError: string | null };

export type NoteId = {
  id: string;
  title: string;
  body: string;
  imgUrl: string;
  date: number;
};
export type Note = {
  title: string;
  body: string;
  imgUrl: string;
  date: number;
};

export type StateNotes = { notes: Array<NoteId>; active: null | NoteId };

export const types = {
  login: "[Auth] Login",
  logout: "[Auth] Logout",

  uiSetError: "[Ui] Set Error",
  uiUnSetError: "[Ui] Unset Error",

  startLoading: "[Ui] StartLoading",
  endLoading: "[Ui] endLoading",

  notesAddNew: "[Notes] NewNote",
  notesActive: "[Notes] SetActiveNote",
  notesLoad: "[Notes] LoadNotes",
  notesUpdated: "[Notes] UpdateNote",
  notesUpImage: "[Notes] UpdatedImage",
  notesDeleted: "[Notes] DeleteNote",
  notesLogoutCleaning: "[Notes] LogoutCleaning",
};
