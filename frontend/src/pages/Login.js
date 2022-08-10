import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, demoLogin, loginError, isLoading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const handleDemoLogin = async () => {
    await demoLogin();
  };

  return (
    <main>
      <img
        src={logo}
        alt="Entertainment web app logo"
        className="authentication-logo"
      />
      <section className="authentication-container login">
        <h1 className="authentication-heading">Login</h1>
        <form className="authentication-form" onSubmit={handleLogin} noValidate>
          <div className="input-wrapper">
            <label htmlFor="login-email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="login-email"
              placeholder="Email address"
              className={`form-input${
                loginError && loginError.email ? " error" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {loginError && loginError.email && (
              <p className="input-error">{loginError.email}</p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="login-password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              placeholder="Password"
              className={`form-input${
                loginError && loginError.password ? " error" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError && loginError.password && (
              <p className="input-error">{loginError.password}</p>
            )}
          </div>
          <button className="btn form-btn" disabled={isLoading}>
            Login to your account
          </button>
        </form>
        <button
          className="btn demo-btn"
          disabled={isLoading}
          onClick={handleDemoLogin}
        >
          Demo Login
        </button>
        <p className="paragraph">
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
