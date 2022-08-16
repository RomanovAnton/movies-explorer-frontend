import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Form.css";

export default function Form({ type }) {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleInputName = (evt) => {
    setInputName(evt.target.value);
  };
  const handleInputEmail = (evt) => {
    setInputEmail(evt.target.value);
  };
  const handleInputPassword = (evt) => {
    setInputPassword(evt.target.value);
  };

  const handleBtnClick = (evt) => {
    evt.preventDefault();
  };

  return (
    <section className="form-container">
      <h1 className="form-container__title">
        {type === "register" ? "Добро пожаловать!" : "Рады видеть!"}
      </h1>
      <form className="form" noValidate>
        <div className="form__fieldsets">
          {type === "register" ? (
            <fieldset className="form__fieldset">
              <label className="form__label">Имя</label>
              <input
                type="text"
                className="form__input"
                name="name"
                minLength={2}
                maxLength={30}
                value={inputName}
                onChange={handleInputName}
              />
            </fieldset>
          ) : null}

          <fieldset className="form__fieldset">
            <label className="form__label">Email</label>
            <input
              type="email"
              className="form__input"
              name="email"
              minLength={2}
              maxLength={30}
              value={inputEmail}
              onChange={handleInputEmail}
            />
          </fieldset>

          <fieldset className="form__fieldset">
            <label className="form__label">Пароль</label>
            <input
              type="password"
              className="form__input"
              name="password"
              value={inputPassword}
              onChange={handleInputPassword}
            />
          </fieldset>

          <span className="form__error">Что-то пошло не так...</span>
        </div>

        <button className="form__button" type="submit" onClick={handleBtnClick}>
          {type === "register" ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>

      <div className="form__nav">
        <p className="form__caption">
          {type === "register"
            ? "Уже зарегистрированы?"
            : "Ещё не зарегистрированы?"}
        </p>
        <Link
          to={type === "register" ? "/sign-in" : "/sign-up"}
          className="form__link"
        >
          {type === "register" ? "Войти" : "Регистрация"}
        </Link>
      </div>
    </section>
  );
}
