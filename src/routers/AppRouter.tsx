import { useEffect, useState } from "react";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { HashRouter, Route, Routes } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useAppDispatch } from "../store/store";
import { login } from "../actions/auth";
import PublicRoutes from "./PublicRoute";
import PrivateRoutes from "./PrivateRoutes";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useAppDispatch();

  const [checking, setChecking] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (!error && data.session) {
        supabase
          .from("users")
          .select("full_name")
          .eq("id", data.session.user.id)
          .single()
          .then(({ data: userResponse, error: userError }) => {
            if (!userError) {
              setIsLogin(true);
              dispatch(login(data.session.user.id, userResponse.full_name));
              dispatch(startLoadingNotes(data.session.user.id));
            }
          });
      } else {
        setIsLogin(false);
      }
      setChecking(false);
    });
  }, [dispatch]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user && event === "SIGNED_IN") {
        supabase
          .from("users")
          .select("full_name")
          .eq("id", session.user.id)
          .single()
          .then(({ data: userResponse, error: userError }) => {
            if (!userError) {
              setIsLogin(true);
              dispatch(login(session.user.id, userResponse.full_name));
              dispatch(startLoadingNotes(session.user.id));
            }
          });
      } else {
        setIsLogin(false);
      }
      setChecking(false);
    });
  }, [dispatch]);

  if (checking) return <h1>Wait ...</h1>;

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoutes component={AuthRouter} isAuthenticated={isLogin} />
          }
        ></Route>
        <Route
          path="*"
          element={
            <PrivateRoutes
              component={JournalScreen}
              isAuthenticated={isLogin}
            />
          }
        ></Route>
      </Routes>
    </HashRouter>
  );
};
