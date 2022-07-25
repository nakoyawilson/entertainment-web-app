import { useEffect, useState } from "react";
import Search from "../components/Search";
import EntertainmentDetails from "../components/EntertainmentDetails";

const Bookmarked = () => {
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
      <Search queryType="bookmarked shows" />
      <section className="container">
        <h2 className="section-heading">Bookmarked Movies</h2>
        <ul className="main-grid">
          {entertainment &&
            entertainment
              .filter(
                (item) =>
                  item.category.toLowerCase() === "movie" && item.isBookmarked
              )
              .map((item) => (
                <EntertainmentDetails key={item._id} item={item} />
              ))}
        </ul>
      </section>
      <section className="container">
        <h2 className="section-heading">Bookmarked TV Series</h2>
        <ul className="main-grid">
          {entertainment &&
            entertainment
              .filter(
                (item) =>
                  item.category.toLowerCase() !== "movie" && item.isBookmarked
              )
              .map((item) => (
                <EntertainmentDetails key={item._id} item={item} />
              ))}
        </ul>
      </section>
    </main>
  );
};

export default Bookmarked;
