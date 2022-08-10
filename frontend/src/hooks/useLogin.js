import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setLoginError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setLoginError(json);
    }

    if (response.ok) {
      console.log(json);
      localStorage.setItem("auth", JSON.stringify(json));
      dispatch({
        type: "LOGIN",
        payload: json,
      });
      setIsLoading(false);
      navigate("/");
    }
  };

  const demoLogin = async () => {
    setIsLoading(true);
    setLoginError(null);

    const response = await fetch("/api/user/demologin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setLoginError(json);
    }

    if (response.ok) {
      localStorage.setItem("auth", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      navigate("/");
    }
  };

  return { login, demoLogin, isLoading, loginError };
};
