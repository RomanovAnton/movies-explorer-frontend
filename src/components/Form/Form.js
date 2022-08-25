import classNames from "classnames";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Form.css";

export default function Form({ type, handleRegister }) {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formParams, setFormParams] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChangeFormParam = (evt) => {
    const { name, value } = evt.target;
    const form = evt.target.closest("form");

    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage((prev) => ({
      ...prev,
      [name]: evt.target.validationMessage,
    }));

    if (form.checkValidity()) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  };

  const handleBtnClick = (evt) => {
    evt.preventDefault();
    handleRegister(formParams);
  };

  const btnClass = classNames("form__button", {
    "form__button_disabled": !formIsValid,
  });

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
                required
                value={formParams.name}
                onChange={handleChangeFormParam}
              />
            </fieldset>
          ) : null}

          <fieldset className="form__fieldset">
            <label className="form__label">Email</label>
            <input
              type="email"
              className="form__input form__input_text_bold"
              name="email"
              minLength={2}
              maxLength={30}
              required
              value={formParams.email}
              onChange={handleChangeFormParam}
            />
          </fieldset>

          <fieldset className="form__fieldset">
            <label className="form__label">Пароль</label>
            <input
              type="password"
              className="form__input form__input_error"
              name="password"
              value={formParams.password}
              onChange={handleChangeFormParam}
              required
            />
          </fieldset>

          <span className="form__error">
            {errorMessage.name || errorMessage.email || errorMessage.password}
          </span>
        </div>

        <button className={btnClass} type="submit" onClick={handleBtnClick}>
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
