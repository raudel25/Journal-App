import {
  provider,
  signInWithPopup,
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "../firebase/firebase-config";
import { AppDispatch } from "../store/store";
import { types, Action } from "../types/types";

export const startSignInWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return (dispatch: AppDispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => console.log(error));
  };
};

export const googleLogin = () => {
  return (dispatch: AppDispatch) => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        console.log(user);
        // dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => console.log(error));
  };
};

export const startRegisterWithEmailAndPassword = (
  name: string,
  email: string,
  password: string
) => {
  return (dispatch: AppDispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => console.log(error));
  };
};

export const login = (uid: string, displayName: string | null): Action => ({
  type: types.login,
  payload: { uid, displayName },
});
