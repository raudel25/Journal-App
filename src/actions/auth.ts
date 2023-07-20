import { types, Action } from "../types/types";

export const a = () => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(login("1234", "pedro"));
    }, 3000);
  };
};

export const login = (uid: string, displayName: string): Action => ({
  type: types.login,
  payload: { uid, displayName },
});
