export type ActionLog = {
  type: string;
  payload: { uid: string; displayName: string | null };
};

export type ActionUi = {
  type: string;
  payload: string | null;
};

export type State = { uid?: string; displayName?: string | null };
export type StateUi = { loading: boolean; msgError: string | null };

export const types = {
  login: "[Auth] Login",
  logout: "[Auth] Logout",
  uiSetError: "[Ui] Set Error",
  uiUnSetError: "[Ui] Unset Error",
  startLoading: "[Ui] StartLoading",
  endLoading: "[Ui] endLoading",
};
