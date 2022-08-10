import searchIcon from "../assets/icon-search.svg";
import "./Search.css";

const Search = ({ queryType }) => {
  return (
    <form className="search-form container">
      <label htmlFor="search" className="sr-only">
        Search for {queryType}
      </label>
      <input
        type="text"
        id="search"
        placeholder={`Search for ${queryType}`}
        className="search-input"
      />
      <button aria-label="Search">
        <img src={searchIcon} alt="" className="search-icon" />
      </button>
    </form>
  );
};

export default Search;
