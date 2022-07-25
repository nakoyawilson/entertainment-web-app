import { useEffect, useState } from "react";
import Search from "../components/Search";
import EntertainmentDetails from "../components/EntertainmentDetails";

const Movies = () => {
  const [entertainment, setEntertainment] = useState(null);

  useEffect(() => {
    const fetchEntertainment = async () => {
      const response = await fetch("/api/entertainment");
      const json = await response.json();
      if (response.ok) {
        setEntertainment(json);
      }
    };
    fetchEntertainment();
  }, []);

  return (
    <main className="main">
      <Search queryType="movies" />
      <section className="container">
        <h2 className="section-heading">Movies</h2>
        <ul className="main-grid">
          {entertainment &&
            entertainment
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
