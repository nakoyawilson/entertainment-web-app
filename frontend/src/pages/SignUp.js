import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { signup, signupError, isLoading } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();

    await signup(email, password, repeatPassword);
  };

  return (
    <main>
      <img
        src={logo}
        alt="Entertainment web app logo"
        className="authentication-logo"
      />
      <section className="authentication-container signup">
        <h1 className="authentication-heading">Sign Up</h1>
        <form
          className="authentication-form"
          onSubmit={handleSignup}
          noValidate
        >
          <div className="input-wrapper">
            <label htmlFor="signup-email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="signup-email"
              placeholder="Email address"
              className={`form-input${
                signupError && signupError.email ? " error" : ""
              }`}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {signupError && signupError.email && (
              <p className="input-error">{signupError.email}</p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="signup-password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="signup-password"
              placeholder="Password"
              className={`form-input${
                signupError && signupError.password ? " error" : ""
              }`}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {signupError && signupError.password && (
              <p className="input-error">{signupError.password}</p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="repeat-password" className="sr-only">
              Repeat password
            </label>
            <input
              type="password"
              id="repeat-password"
              placeholder="Repeat password"
              className={`form-input${
                signupError && signupError.repeatPassword ? " error" : ""
              }`}
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
            />
            {signupError && signupError.repeatPassword && (
              <p className="input-error">{signupError.repeatPassword}</p>
            )}
          </div>
          <button className="btn form-btn" disabled={isLoading}>
            Create an account
          </button>
        </form>
        <p className="paragraph">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignUp;
