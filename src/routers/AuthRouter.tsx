import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { Route, Routes, Navigate } from "react-router-dom";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Routes>
          <Route path="/register" element={<RegisterScreen />}></Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route
            path="*"
            element={<Navigate to="/auth/login" replace></Navigate>}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};
