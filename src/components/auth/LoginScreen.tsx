import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {
  googleLogin,
  startSignInWithEmailAndPassword,
} from "../../actions/auth";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const LoginScreen = () => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const { email, password } = formValues;

  const { loading } = useSelector((state: RootState) => state.ui);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(startSignInWithEmailAndPassword(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={handleLogin}>
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

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
        </button>
        <hr />

        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className="link" to="/auth/register">
          Create new Account
        </Link>
      </form>
    </>
  );
};
