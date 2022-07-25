import bookmarkFull from "../assets/icon-bookmark-full.svg";
import bookmarkEmpty from "../assets/icon-bookmark-empty.svg";
import moviesIcon from "../assets/icon-category-movie.svg";
import tvIcon from "../assets/icon-category-tv.svg";
import "./EntertainmentDetails.css";

const TrendingDetails = ({ item }) => {
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
        <button
          aria-label={`${item.title} is ${
            item.isBookmarked ? "" : "not "
          }bookmarked`}
          className="bookmark-btn"
        >
          <img src={item.isBookmarked ? bookmarkFull : bookmarkEmpty} alt="" />
        </button>
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
