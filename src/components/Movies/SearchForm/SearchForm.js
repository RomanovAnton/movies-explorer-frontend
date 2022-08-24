import classNames from "classnames";
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
  const [inputValueIsValid, setInputValueIsValid] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);

  const btnClass = classNames("search-form__btn", {
    "search-form__btn_disabled": !inputValueIsValid,
  });

  useEffect(() => {
    const inputValue = localStorage.getItem("search-text");
    const checkboxValue = localStorage.getItem("is-short-movies");

    if (checkboxValue === "yes") {
      setCheckboxValue(true);
    } else {
      setCheckboxValue(false);
    }

    setInputValue(inputValue);
  }, []);

  useEffect(() => {
    inputValue.length === 0
      ? setInputValueIsValid(false)
      : setInputValueIsValid(true);
  }, [inputValue]);

  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleCheckboxChange = () => {
    setCheckboxValue(!checkboxValue);
    // localStorage.setItem("is-short-movies", checkboxValue ? "yes" : "no");
    // renderMovies();
  };

  const handleSearchClick = (evt) => {
    evt.preventDefault();
    localStorage.setItem("search-text", inputValue.toLowerCase());
    localStorage.setItem("is-short-movies", checkboxValue ? "yes" : "no");
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
        .catch(() =>
          openPopup(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          )
        )
        .finally(() => closePreloader());
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
          <button
            className={btnClass}
            onClick={handleSearchClick}
            disabled={!inputValueIsValid}
          ></button>
        </div>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={checkboxValue ?? false}
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
