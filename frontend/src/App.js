import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Bookmarked from "./pages/Bookmarked";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import SignUp from "./pages/SignUp";
import TVSeries from "./pages/TVSeries";
import Entertainment from "./pages/Entertainment";
import Header from "./components/Header";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";

const App = () => {
  const { auth } = useAuthContext();

  return (
    <div className={auth ? "app" : ""}>
      <BrowserRouter>
        {auth && <Header />}
        <Routes>
          <Route
            path="/"
            element={auth ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="bookmarked"
            element={auth ? <Bookmarked /> : <Navigate to="/login" />}
          />
          <Route
            path="movies"
            element={auth ? <Movies /> : <Navigate to="/login" />}
          />
          <Route
            path="tvseries"
            element={auth ? <TVSeries /> : <Navigate to="/login" />}
          />
          <Route
            path="login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="signup"
            element={!auth ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="add"
            element={auth ? <Entertainment /> : <Navigate to="/login" />}
          />
          <Route
            path="edit"
            element={auth ? <Entertainment /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={
              auth ? (
                <Navigate to="/" replace={true} />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
