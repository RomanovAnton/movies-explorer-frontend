import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { getMovies } from "../../../utils/MoviesApi";
import { COMMON_ERROR_TEXT } from "../../../utils/constants/constants";
import "./SearchForm.css";

export default function SearchForm({
  type,
  renderMovies,
  renderSavedMovies,
  openPopup,
  openPreloader,
  closePreloader,
}) {
  const [inputValue, setInputValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [inputValueIsValid, setInputValueIsValid] = useState(false);

  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleCheckboxChange = () => {
    setCheckboxValue(!checkboxValue);
    // localStorage.setItem("is-short-movies", checkboxValue ? "yes" : "no");
    // renderMovies();
  };

  const btnClass = classNames("search-form__btn", {
    "search-form__btn_disabled": !inputValueIsValid,
  });

  useEffect(() => {
    if (type === "all") {
      const inputValue = localStorage.getItem("search-text");
      const checkboxValue = localStorage.getItem("is-short-movies");
      if (checkboxValue === "yes") {
        setCheckboxValue(true);
      } else {
        setCheckboxValue(false);
      }
      setInputValue(inputValue);
    } else if (type === "saved") {
      setInputValue("");
      setCheckboxValue(false);
    }
  }, []);

  useEffect(() => {
    if (inputValue) {
      setInputValueIsValid(true);
    } else {
      setInputValueIsValid(false);
    }
  }, [inputValue]);

  const handleSearchClick = (evt) => {
    evt.preventDefault();
    if (type === "all") {
      localStorage.setItem("search-text", inputValue.toLowerCase());
      localStorage.setItem("is-short-movies", checkboxValue ? "yes" : "no");
      const serverData = localStorage.getItem("all-movies");
      if (!serverData) {
        openPreloader();
        getMovies()
          .then((res) => {
            localStorage.setItem("all-movies", JSON.stringify(res));
          })
          .then(() => {
            renderMovies();
          })
          .catch(() => openPopup(COMMON_ERROR_TEXT))
          .finally(() => closePreloader());
      } else {
        renderMovies();
      }
    } else if (type === "saved") {
      renderSavedMovies({
        searchText: inputValue,
        isShortMovies: checkboxValue,
      });
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
