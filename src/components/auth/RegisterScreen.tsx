import { Link } from "react-router-dom";

export const RegisterScreen = () => {
  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
        ></input>

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
        ></input>

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
        ></input>

        <input
          type="password"
          placeholder="Confirm"
          name="confirm"
          className="auth__input"
        ></input>

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link className="link" to="/auth/register">
          Already Registered?
        </Link>
      </form>
    </>
  );
};
