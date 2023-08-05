import { provider, signInWithPopup, auth } from "../firebase/firebase-config";
import { AppDispatch } from "../store/store";
import { supabase } from "../supabase/client";
import { types, ActionLog } from "../types/types";
import { endLoading, startLoading } from "./ui";
import alertMsg from "sweetalert2";

export const startSignInWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading());

    const { data: authResponse, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      alertMsg.fire("Error", authError.message, "error");
      return;
    }

    const { data: userResponse, error: userError } = await supabase
      .from("users")
      .select("full_name")
      .eq("id", authResponse!.user.id)
      .single();

    if (userError) {
      alertMsg.fire("Error", userError.message, "error");
      return;
    }
    dispatch(login(authResponse.user!.id, userResponse.full_name));
    dispatch(endLoading());
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
  full_name: string,
  email: string,
  password: string
) => {
  return async (dispatch: AppDispatch) => {
    const { data: authResponse, error: authError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (authError) {
      alertMsg.fire("Error", authError.message, "error");
      return;
    }

    const { data: _, error: userError } = await supabase.from("users").insert([
      {
        id: authResponse.user!.id,
        full_name,
      },
    ]);

    if (userError) {
      alertMsg.fire("Error", userError.message, "error");
      return;
    }

    dispatch(login(authResponse.user!.id, full_name));
  };
};

export const startLogout = () => {
  return (dispatch: AppDispatch) => {
    supabase.auth.signOut().then(() => {
      dispatch(logout());
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
