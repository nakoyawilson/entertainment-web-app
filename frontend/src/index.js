import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./index.css";
import App from "./App";
import { EntertainmentContextProvider } from "./context/EntertainmentContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EntertainmentContextProvider>
        <App />
      </EntertainmentContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
