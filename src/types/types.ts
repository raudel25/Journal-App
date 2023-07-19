export type Action = {
  type: string;
  payload: { uid: string; displayName: string };
};

export type State = { uid?: string; displayName?: string };

export const types = {
  login: "[Auth] Login",
  logout: "[Auth] Logout",
};
