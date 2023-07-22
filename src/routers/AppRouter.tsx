import { useEffect, useState } from "react";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
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
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        dispatch(startLoadingNotes(user.uid));

        setIsLogin(true);
      } else {
        setIsLogin(false);
      }

      setChecking(false);
    });
  }, [dispatch]);

  if (checking) return <h1>Espere ...</h1>;

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};
