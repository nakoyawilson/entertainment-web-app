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

const EntertainmentDetails = ({ item }) => {
  const { auth, dispatch } = useAuthContext();
  const [bookmark, setBookmark] = useState(
    auth.bookmarks && auth.bookmarks.includes(item._id) ? true : false
  );
  const navigate = useNavigate();
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
      localStorage.setItem("auth", JSON.stringify(json));
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
        {auth && auth.isAdmin ? (
          <div className="admin-controls">
            <button
              onClick={fetchEntertainment}
              className="entertainment-btn"
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
            className="entertainment-btn bookmark-btn"
            aria-label={`${item.title} is ${bookmark ? "" : "not "}bookmarked`}
          >
            <img src={bookmark ? bookmarkFull : bookmarkEmpty} alt="" />
          </button>
        )}
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
    </li>
  );
};

export default EntertainmentDetails;
