import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEntertainmentContext } from "../hooks/useEntertainmentContext";

const EntertainmentForm = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { singleEntertainment, dispatch } = useEntertainmentContext();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(1900);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [isTrending, setIsTrending] = useState(false);
  const [regularThumbnail, setRegularThumbnail] = useState("");
  const [trendingThumbnail, setTrendingThumbnail] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entertainment = {
      title,
      year,
      category,
      rating,
      isTrending,
      regularThumbnail,
      trendingThumbnail,
    };

    const response = await fetch(
      pathname === "/edit"
        ? `/api/entertainment/${singleEntertainment._id}`
        : "/api/entertainment",
      {
        method: pathname === "/edit" ? "PATCH" : "POST",
        body: JSON.stringify(entertainment),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setYear(1900);
      setCategory("");
      setRating("");
      setIsTrending(false);
      setRegularThumbnail("");
      setTrendingThumbnail("");
      setError(null);
      dispatch({
        type:
          pathname === "/edit"
            ? "UPDATE_ENTERTAINMENT"
            : "CREATE_ENTERTAINMENT",
        payload: json,
      });
      navigate("/");
    }
  };

  useEffect(() => {
    if (singleEntertainment) {
      setTitle(singleEntertainment.title);
      setYear(singleEntertainment.year);
      setCategory(singleEntertainment.category);
      setRating(singleEntertainment.rating);
      setIsTrending(singleEntertainment.isTrending);
    }
  }, [singleEntertainment]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />
      </div>
      <div>
        <label htmlFor="year">Year</label>
        <input
          type="number"
          id="year"
          min="1900"
          max="2099"
          step="1"
          onChange={(e) => setYear(e.target.value)}
          value={year}
          className={emptyFields.includes("year") ? "error" : ""}
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={emptyFields.includes("category") ? "error" : ""}
        >
          <option value="Movie">Movie</option>
          <option value="TV Series">TV Series</option>
        </select>
      </div>
      <div>
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className={emptyFields.includes("rating") ? "error" : ""}
        >
          <option value="E">E</option>
          <option value="PG">PG</option>
          <option value="18+">18+</option>
        </select>
      </div>
      <div>
        <label htmlFor="isTrending">Is Trending?</label>
        <input
          type="checkbox"
          id="isTrending"
          onChange={(e) => setIsTrending(e.target.value)}
          checked={isTrending}
        />
      </div>
      <button className="btn">{pathname === "/edit" ? "Update" : "Add"}</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default EntertainmentForm;
