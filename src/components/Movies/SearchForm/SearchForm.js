import React, { useState, useEffect } from "react";
import { getMovies } from "../../../utils/MoviesApi";
import {
  COMMON_ERROR_TEXT,
  ERROR_VALID_SEARCH_TEXT,
} from "../../../utils/constants/constants";
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
  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleCheckboxChange = () => {
    if (type === "all") {
      localStorage.setItem("is-short-movies", checkboxValue ? "no" : "yes");
      renderMovies();
      setCheckboxValue(!checkboxValue);
    } else if (type === "saved") {
      renderSavedMovies({
        searchText: inputValue,
        isShortMovies: checkboxValue,
      });
      setCheckboxValue(!checkboxValue);
    }
  };

  const handleSearchClick = (evt) => {
    evt.preventDefault();
    if (!inputValue) {
      openPopup(ERROR_VALID_SEARCH_TEXT);
      return;
    }

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
            className="search-form__btn"
            onClick={handleSearchClick}
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
