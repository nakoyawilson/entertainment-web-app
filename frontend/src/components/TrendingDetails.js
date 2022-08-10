import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEntertainmentContext } from "../hooks/useEntertainmentContext";
import bookmarkFull from "../assets/icon-bookmark-full.svg";
import bookmarkEmpty from "../assets/icon-bookmark-empty.svg";
import deleteIcon from "../assets/icon-delete.svg";
import editIcon from "../assets/icon-edit.svg";
import moviesIcon from "../assets/icon-category-movie.svg";
import tvIcon from "../assets/icon-category-tv.svg";
import "./EntertainmentDetails.css";

const TrendingDetails = ({ item }) => {
  const navigate = useNavigate();
  const { auth, dispatch } = useAuthContext();
  const [bookmark, setBookmark] = useState(
    auth.bookmarks.includes(item._id) ? true : false
  );

  const { dispatch: entertainmentDispatch } = useEntertainmentContext();

  const fetchEntertainment = async () => {
    if (!auth) {
      return;
    }
    const response = await fetch(`/api/entertainment/${item._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      entertainmentDispatch({
        type: "FIND_SINGLE_ENTERTAINMENT",
        payload: json,
      });
      navigate("/edit");
    }
  };

  const handleDelete = async () => {
    if (!auth) {
      return;
    }
    const response = await fetch(`/api/entertainment/${item._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      entertainmentDispatch({ type: "DELETE_ENTERTAINMENT", payload: json });
    }
  };

  const toggleBookmark = async () => {
    if (!auth) {
      return;
    }
    let bookmarks = auth.bookmarks;
    if (bookmarks.find((content) => content === item._id)) {
      bookmarks = bookmarks.filter((content) => content !== item._id);
    } else {
      bookmarks.push(item._id);
    }

    const response = await fetch(`/api/user/${auth._id}`, {
      method: "PATCH",
      body: JSON.stringify(bookmarks),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });

    const json = await response.json();
    const updatedAuth = { ...auth };
    updatedAuth.bookmarks = json.bookmarks;
    if (response.ok) {
      dispatch({
        type: "UPDATE_USER",
        payload: updatedAuth,
      });
      setBookmark(!bookmark);
      localStorage.setItem("auth", JSON.stringify(updatedAuth));
    }
  };

  return (
    <li className="trending-li">
      <div className="trending-poster-wrapper">
        <picture>
          <source
            media="(max-width: 888px)"
            srcSet={item.thumbnail.trending.small}
          />
          <source
            media="(min-width: 889px)"
            srcSet={item.thumbnail.trending.large}
          />
          <img
            src={item.thumbnail.trending.small}
            alt={`${item.title} ${item.category} poster`}
            className="poster"
          />
        </picture>
        {auth && auth.isAdmin ? (
          <div className="admin-controls">
            <button
              className="entertainment-btn"
              onClick={fetchEntertainment}
              aria-label={`Edit ${item.title}`}
            >
              <img src={editIcon} alt="" className="admin-icon" />
            </button>
            <button
              onClick={handleDelete}
              className="entertainment-btn"
              aria-label={`Delete ${item.title}`}
            >
              <img src={deleteIcon} alt="" className="admin-icon" />
            </button>
          </div>
        ) : (
          <button
            onClick={toggleBookmark}
            aria-label={`${item.title} is ${bookmark ? "" : "not "}bookmarked`}
            className="entertainment-btn bookmark-btn"
          >
            <img src={bookmark ? bookmarkFull : bookmarkEmpty} alt="" />
          </button>
        )}
      </div>
      <div className="text-wrapper">
        <div className="trending-details-wrapper">
          <span className="trending-detail">{item.year}</span>
          <span className="trending-circle"></span>
          <span className="trending-detail category">
            <img
              src={
                item.category.toLowerCase() === "movie" ? moviesIcon : tvIcon
              }
              alt=""
              className="trending-category-icon"
            />
            {item.category}
          </span>
          <span className="trending-circle"></span>
          <span className="trending-detail">{item.rating}</span>
        </div>
        <h3 className="trending-title">{item.title}</h3>
      </div>
    </li>
  );
};

export default TrendingDetails;
