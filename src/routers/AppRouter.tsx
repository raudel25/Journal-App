import { useEffect, useState } from "react";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useAppDispatch } from "../store/store";
import { login } from "../actions/auth";

export const AppRouter = () => {
  const dispatch = useAppDispatch();

  const [checking, setChecking] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }

      setChecking(false);
    });
  }, []);

  if (checking) return <h1>Espere ...</h1>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />}></Route>
        <Route path="*" element={<JournalScreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
