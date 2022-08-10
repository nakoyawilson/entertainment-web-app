import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [signupError, setSignupError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (email, password, repeatPassword) => {
    setIsLoading(true);
    setSignupError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, repeatPassword }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setSignupError(json);
    }

    if (response.ok) {
      localStorage.setItem("auth", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      navigate("/");
    }
  };

  return { signup, isLoading, signupError };
};
