import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { startSignInWithEmailAndPassword } from "../../actions/auth";
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

        <Link className="link" to="/auth/register">
          Create new Account
        </Link>
      </form>
    </>
  );
};
