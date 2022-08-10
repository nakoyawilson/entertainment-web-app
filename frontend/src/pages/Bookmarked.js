import { useEntertainmentContext } from "../hooks/useEntertainmentContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Search from "../components/Search";
import Loader from "../components/Loader";
import EntertainmentDetails from "../components/EntertainmentDetails";

const Bookmarked = () => {
  const { allEntertainment } = useEntertainmentContext();
  const { auth } = useAuthContext();

  return (
    <main className="main">
      <Search queryType="bookmarked shows" />
      <section className="container">
        <h2 className="section-heading">Bookmarked Movies</h2>
        {!allEntertainment && <Loader />}
        <ul className="main-grid">
          {allEntertainment &&
            allEntertainment
              .filter(
                (item) =>
                  item.category.toLowerCase() === "movie" &&
                  auth.bookmarks.includes(item._id)
              )
              .map((item) => (
                <EntertainmentDetails key={item._id} item={item} />
              ))}
        </ul>
      </section>
      <section className="container">
        <h2 className="section-heading">Bookmarked TV Series</h2>
        {!allEntertainment && <Loader />}
        <ul className="main-grid">
          {allEntertainment &&
            allEntertainment
              .filter(
                (item) =>
                  item.category.toLowerCase() !== "movie" &&
                  auth.bookmarks.includes(item._id)
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
