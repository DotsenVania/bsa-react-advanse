import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { auth } from "../../store/auth/actions";

export default function SignIn() {
  const navigate = useNavigate();
  const { loadingAuth, errorAuth, presenceOfToken, errorAuthMessage } =
    useAppSelector((state) => state.auth);

  useEffect(() => {
    if (presenceOfToken) {
      navigate("/");
    }
  }, [presenceOfToken]);

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authData = {
    email,
    password,
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(auth(authData));
  };

  const styleError = errorAuth
    ? { border: "2px solid red" }
    : { border: "none" };
  const errMessage = errorAuth ? (
    <p style={{ color: "red" }}>{errorAuthMessage}</p>
  ) : null;
  const form = !loadingAuth ? (
    <>
      <label className="input">
        <span className="input__heading">Email</span>
        <input
          style={styleError}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          data-test-id="auth-email"
          name="email"
          type="email"
          required
        />
      </label>
      <label className="input">
        <span className="input__heading">Password</span>
        <input
          style={styleError}
          onChange={(e) => setPassword(e.target.value)}
          data-test-id="auth-password"
          value={password}
          name="password"
          type="password"
          minLength={3}
          maxLength={20}
          autoComplete="new-password"
          required
        />
      </label>
      <button data-test-id="auth-submit" className="button" type="submit">
        Sign In
      </button>
    </>
  ) : (
    <div className="wrapper">
      <div className="lds-dual-ring"></div>
    </div>
  );

  return (
    <main className="sign-in-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form onSubmit={onSubmit} className="sign-in-form" autoComplete="off">
        <h2 className="sign-in-form__title">Sign In</h2>
        {errMessage}
        {form}
      </form>
      <span>
        Don't have an account?
        <Link
          data-test-id="auth-sign-up-link"
          to={"/sign-up"}
          className="sign-in-form__link"
        >
          Sign Up
        </Link>
      </span>
    </main>
  );
}
