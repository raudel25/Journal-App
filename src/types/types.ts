export type Action = {
  type: string;
  payload: { uid: string; displayName: string | null };
};

export type ActionUi = {
  type: string;
  payload: string;
};

export type State = { uid?: string; displayName?: string | null };
export type StateUi = { loading: boolean; msgError: string };

export const types = {
  login: "[Auth] Login",
  logout: "[Auth] Logout",
  uiSetError: "[Ui] Set Error",
  uiUnSetError: "[Ui] Unset Error",
};
