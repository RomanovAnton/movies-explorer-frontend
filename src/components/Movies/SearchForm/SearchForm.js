import React from "react";
import "./SearchForm.css";

export default function SearchForm() {
  return (
    <section className="search">
      <form className="search-form">
        <div className="search-form__container">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
          />
          <div className="search-form__btn"></div>
        </div>
        <label className="checkbox">
          <input type="checkbox" className="checkbox__input" />
          <div className="checkbox__custom"></div>
          <p className="checkbox__caption">Короткометражки</p>
        </label>
      </form>
    </section>
  );
}
