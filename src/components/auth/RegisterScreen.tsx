import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setError, unSetError } from "../../actions/ui";

export const RegisterScreen = () => {
  const [formValues, handleInputChange] = useForm({
    name: "Raudel",
    email: "ragm@gmail.com",
    password: "1234",
    confirm: "1234",
  });

  const dispatch: Dispatch<any> = useDispatch();

  const { msgError } = useSelector((state: any) => state.ui);

  const { name, email, password, confirm } = formValues;

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValid()) {
      dispatch(unSetError());
    }
  };

  const isValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is requerid"));
      return false;
    }

    if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    }

    if (password !== confirm || password.length < 5) {
      dispatch(setError("Password should be at least 6 characters and match"));
      return false;
    }

    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      {msgError !== "" && <div className="auth__alert-error">{msgError}</div>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          value={name}
          onChange={handleInputChange}
        ></input>

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          value={email}
          onChange={handleInputChange}
        ></input>

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        ></input>

        <input
          type="password"
          placeholder="Confirm"
          name="confirm"
          className="auth__input"
          value={confirm}
          onChange={handleInputChange}
        ></input>

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link className="link" to="/auth/login">
          Already Registered?
        </Link>
      </form>
    </>
  );
};
