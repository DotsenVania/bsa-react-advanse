import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { registration } from "../../store/auth/actions";
export default function SignUp() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { loadingAuth, errorRegistration, presenceOfToken, errorMessage } = useAppSelector(
    (state) => state.auth
  );;
  useEffect(() => {
    if (presenceOfToken) {
      navigate("/");
    }
  }, [presenceOfToken]);


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrationData = {
    fullName,
    email,
    password,
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registration(registrationData));
  };

  const styleError = errorRegistration ? { border: "2px solid red" } : { border: "none" };
  const errMessage = errorRegistration ? (
    <p style={{ color: "red" }}>{errorMessage}</p>
  ) : null;
  const form = !loadingAuth ? (
    <>
      <label className="input">
        <span className="input__heading">Full name</span>
        <input
          style={styleError}
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          data-test-id="auth-full-name"
          name="full-name"
          type="text"
          required
        />
      </label>
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
          value={password}
          data-test-id="auth-password"
          name="password"
          type="password"
          minLength={3}
          maxLength={20}
          autoComplete="new-password"
          required
        />
      </label>
      <button data-test-id="auth-submit" className="button" type="submit">
        Sign Up
      </button>
    </>
  ) : (
    <div className="wrapper">
      <div className="lds-dual-ring"></div>
    </div>
  );
  return (
    <main className="sign-up-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form onSubmit={onSubmit} className="sign-up-form" autoComplete="off">
        <h2 className="sign-up-form__title">Sign Up</h2>
        {errMessage}
        {form}
      </form>
      <span>
        Already have an account?
        <Link
          data-test-id="auth-sign-in-link"
          to={"/sign-in"}
          className="sign-up-form__link"
        >
          Sign In
        </Link>
      </span>
    </main>
  );
}
