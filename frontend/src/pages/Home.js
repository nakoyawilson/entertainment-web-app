import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEntertainmentContext } from "../hooks/useEntertainmentContext";
import Search from "../components/Search";
import Loader from "../components/Loader";
import TrendingDetails from "../components/TrendingDetails";
import EntertainmentDetails from "../components/EntertainmentDetails";
import "./Home.css";

const Home = () => {
  const { allEntertainment, dispatch } = useEntertainmentContext();
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchEntertainment = async () => {
      const response = await fetch("/api/entertainment", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_ENTERTAINMENT", payload: json });
      }
    };
    if (auth) {
      fetchEntertainment();
    }
  }, [dispatch, auth]);

  return (
    <main className="main">
      <Search queryType="movies or TV series" />
      <section className="trending">
        <h2 className="section-heading">Trending</h2>
        {!allEntertainment && <Loader />}
        <ul className="trending-carousel">
          {allEntertainment &&
            allEntertainment
              .filter((item) => item.isTrending)
              .map((item) => <TrendingDetails key={item._id} item={item} />)}
        </ul>
      </section>
      <section className="container">
        <h2 className="section-heading recommended-heading">
          Recommended for you
        </h2>
        {!allEntertainment && <Loader />}
        <ul className="main-grid">
          {allEntertainment &&
            allEntertainment
              .filter((item) => !item.isTrending)
              .map((item) => (
                <EntertainmentDetails key={item._id} item={item} />
              ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
