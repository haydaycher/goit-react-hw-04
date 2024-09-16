import { useState } from "react";
// import css from "./SearchBar.module.css";

const SearchBar = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <header>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </label>

          <button type="submit">Search</button>
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
