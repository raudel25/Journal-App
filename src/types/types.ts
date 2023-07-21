export type ActionLog = {
  type: string;
  payload: { uid: string; displayName: string | null };
};

export type ActionUi = {
  type: string;
  payload: string | null;
};

export type StateLog = { uid?: string; displayName?: string | null };
export type StateUi = { loading: boolean; msgError: string | null };
type Note = {
  id: string;
  tittle: string;
  body: string;
  imgUrl: string;
  date: number;
};
export type StateNotes = { notes: Array<Note>; active: null | Note };

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
