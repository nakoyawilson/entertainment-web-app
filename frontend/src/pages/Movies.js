import { useEntertainmentContext } from "../hooks/useEntertainmentContext";
import Search from "../components/Search";
import Loader from "../components/Loader";
import EntertainmentDetails from "../components/EntertainmentDetails";

const Movies = () => {
  const { allEntertainment } = useEntertainmentContext();

  return (
    <main className="main">
      <Search queryType="movies" />
      <section className="container">
        <h2 className="section-heading">Movies</h2>
        {!allEntertainment && <Loader />}
        <ul className="main-grid">
          {allEntertainment &&
            allEntertainment
              .filter((item) => item.category.toLowerCase() === "movie")
              .map((item) => (
                <EntertainmentDetails key={item._id} item={item} />
              ))}
        </ul>
      </section>
    </main>
  );
};

export default Movies;
