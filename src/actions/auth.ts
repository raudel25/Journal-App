import {
  provider,
  signInWithPopup,
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "../firebase/firebase-config";
import { AppDispatch } from "../store/store";
import { types, ActionLog } from "../types/types";
import { endLoading, startLoading } from "./ui";
import alertMsg from "sweetalert2";

export const startSignInWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(endLoading());
      })
      .catch((error) => {
        alertMsg.fire("Error", error.message, "error");
        dispatch(endLoading());
      });
  };
};

export const googleLogin = () => {
  return (dispatch: AppDispatch) => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        alertMsg.fire("Error", error.message, "error");
      });
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
      .catch((error) => {
        alertMsg.fire("Error", error.message, "error");
      });
  };
};

export const startLogout = () => {
  return (dispatch: AppDispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        alertMsg.fire("Error", error.message, "error");
      });
  };
};

export const login = (uid: string, displayName: string | null): ActionLog => ({
  type: types.login,
  payload: { uid, displayName },
});

export const logout = (): ActionLog => ({
  type: types.logout,
  payload: { uid: "", displayName: "" },
});
