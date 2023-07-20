import { provider, signInWithPopup, auth } from "../firebase/firebase-config";
import { types, Action } from "../types/types";

export const a = () => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(login("1234", "pedro"));
    }, 3000);
  };
};

export const googleLogin = () => {
  return (dispatch: any) => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        console.log(user);
        // dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => console.log(error));
  };
};

export const login = (uid: string, displayName: string | null): Action => ({
  type: types.login,
  payload: { uid, displayName },
});
