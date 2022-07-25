import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./reset.css";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Bookmarked from "./pages/Bookmarked";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import SignUp from "./pages/SignUp";
import TVSeries from "./pages/TVSeries";
import Entertainment from "./pages/Entertainment";
import { EntertainmentContextProvider } from "./context/EntertainmentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EntertainmentContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="bookmarked" element={<Bookmarked />} />
            <Route path="movies" element={<Movies />} />
            <Route path="tvseries" element={<TVSeries />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="add" element={<Entertainment />} />
            <Route path="edit" element={<Entertainment />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EntertainmentContextProvider>
  </React.StrictMode>
);
