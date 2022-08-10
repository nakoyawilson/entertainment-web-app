import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { auth: action.payload };
    case "LOGOUT":
      return { auth: null };
    case "UPDATE_USER":
      return { auth: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    auth: null,
  });
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth) {
      dispatch({ type: "LOGIN", payload: auth });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
