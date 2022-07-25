import { useNavigate } from "react-router-dom";
import { useEntertainmentContext } from "../hooks/useEntertainmentContext";
import bookmarkFull from "../assets/icon-bookmark-full.svg";
import bookmarkEmpty from "../assets/icon-bookmark-empty.svg";
import moviesIcon from "../assets/icon-category-movie.svg";
import tvIcon from "../assets/icon-category-tv.svg";
import "./EntertainmentDetails.css";

const EntertainmentDetails = ({ item }) => {
  const navigate = useNavigate();
  const { dispatch } = useEntertainmentContext();

  const fetchEntertainment = async () => {
    const response = await fetch(`/api/entertainment/${item._id}`, {
      method: "GET",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "FIND_SINGLE_ENTERTAINMENT", payload: json });
      navigate("/edit");
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/entertainment/${item._id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_ENTERTAINMENT", payload: json });
    }
  };
  return (
    <li>
      <div className="poster-wrapper">
        <picture>
          <source
            media="(max-width: 888px)"
            srcSet={item.thumbnail.regular.small}
          />
          <source
            media="(max-width: 1297px) and (min-width: 889px)"
            srcSet={item.thumbnail.regular.medium}
          />
          <source
            media="(min-width: 1298px)"
            srcSet={item.thumbnail.regular.large}
          />
          <img
            src={item.thumbnail.regular.small}
            alt={`${item.title} ${item.category} poster`}
            className="poster"
          />
        </picture>
        <button
          aria-label={`${item.title} is ${
            item.isBookmarked ? "" : "not "
          }bookmarked`}
          className="bookmark-btn"
        >
          <img src={item.isBookmarked ? bookmarkFull : bookmarkEmpty} alt="" />
        </button>
      </div>
      <div className="details-wrapper">
        <span className="detail">{item.year}</span>
        <span className="circle"></span>
        <span className="detail category">
          <img
            src={item.category.toLowerCase() === "movie" ? moviesIcon : tvIcon}
            alt=""
            className="category-icon"
          />
          {item.category}
        </span>
        <span className="circle"></span>
        <span className="detail">{item.rating}</span>
      </div>
      <h3 className="title">{item.title}</h3>
      <button className="btn" onClick={fetchEntertainment}>
        edit
      </button>
      <button onClick={handleDelete} className="btn">
        delete
      </button>
    </li>
  );
};

export default EntertainmentDetails;
