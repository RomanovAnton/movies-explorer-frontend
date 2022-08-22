import React, { useState } from "react";
import { moviesApi } from "../../../utils/MoviesApi";
import "./SearchForm.css";

export default function SearchForm({ renderMovies }) {
  const [inputValue, setInputValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(true);

  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleCheckboxChange = () => {
    setCheckboxValue(!checkboxValue);
  };

  const handleSearchClick = () => {
    localStorage.setItem("search-text", inputValue.toLowerCase());
    localStorage.setItem("is-short-movies", checkboxValue);

    const allMovies = localStorage.getItem("all-movies");
    if (!allMovies) {
      moviesApi.getMovies().then((res) => {
        localStorage.setItem("all-movies", JSON.stringify(res));
      });
    }
    renderMovies();
  };

  return (
    <section className="search">
      <form className="search-form">
        <div className="search-form__container">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            value={inputValue ?? ""}
            onChange={handleInputChange}
          />
          <div className="search-form__btn" onClick={handleSearchClick}></div>
        </div>
        <label className="checkbox">
          <input
            type="checkbox"
            className="checkbox__input"
            value={checkboxValue}
            onChange={handleCheckboxChange}
          />
          <div className="checkbox__custom"></div>
          <p className="checkbox__caption">Короткометражки</p>
        </label>
      </form>
    </section>
  );
}
