import { useState } from "react";
// import { Field, Form, Formik } from "formik";
import { IoSearchOutline } from "react-icons/io5";
import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  // const handleChangeInput = (e) => {
  //   setFormData((prev) => {
  //     return {
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };
  return (
    <div className={css.searchContainer}>
      <header className={css.header}>
        <form onSubmit={handleSubmit} className={css.form}>
          <label className={css.inputWrapper}>
            <input
              className={css.searchInput}
              value={query}
              name="message"
              onChange={handleChange}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </label>

          <button className={css.searchBtn} type="submit">
            <IoSearchOutline className={css.icon} />
          </button>
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
