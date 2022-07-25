import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  const { pathname } = useLocation();

  return (
    <div className="app">
      {pathname !== "/signup" && pathname !== "/login" && <Header />}
      <Outlet />
    </div>
  );
};

export default App;
