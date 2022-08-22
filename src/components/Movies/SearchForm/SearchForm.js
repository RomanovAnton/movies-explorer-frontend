import React, { useState, useEffect } from "react";
import { moviesApi } from "../../../utils/MoviesApi";

import "./SearchForm.css";

export default function SearchForm({
  renderMovies,
  openPopup,
  openPreloader,
  closePreloader,
}) {
  const [inputValue, setInputValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);

  // useEffect(() => {
  //   const inputValue = localStorage.getItem("search-text");
  //   setInputValue(inputValue);
  // }, []);

  console.log(checkboxValue);

  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleCheckboxChange = () => {
    setCheckboxValue(!checkboxValue);
  };

  const handleSearchClick = () => {
    // localStorage.clear();
    localStorage.setItem("search-text", inputValue.toLowerCase());
    localStorage.setItem("is-short-movie", checkboxValue ? "yes" : "no");
    const serverData = localStorage.getItem("all-movies");
    if (!serverData) {
      openPreloader();
      moviesApi
        .getMovies()
        .then((res) => {
          localStorage.setItem("all-movies", JSON.stringify(res));
        })
        .then(() => {
          renderMovies();
        })
        .catch(() => openPopup("Ошибка сервера"))
        .finally(() => closePreloader());
    }
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
            checked={checkboxValue}
            className="checkbox__input"
            onChange={handleCheckboxChange}
          />
          <div className="checkbox__custom"></div>
          <p className="checkbox__caption">Короткометражки</p>
        </label>
      </form>
    </section>
  );
}
