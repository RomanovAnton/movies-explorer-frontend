import classNames from "classnames";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Form.css";

export default function Form({
  type,
  onRegister,
  onLogin,
  authError,
  onResetError,
}) {
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
    if (type === "register") {
      onRegister(formParams);
    } else {
      onLogin(formParams);
    }
    setFormIsValid(false);
  };

  const btnClass = classNames("form__button", {
    "form__button_disabled": !formIsValid,
  });

  const inputNameClass = classNames("form__input", {
    "form__input_error": errorMessage.name,
  });

  const inputEmailClass = classNames("form__input", "form__input_text_bold", {
    "form__input_error": errorMessage.email,
  });

  const inputPasswordClass = classNames("form__input", {
    "form__input_error": errorMessage.password,
  });

  useEffect(() => {
    if (authError) {
      onResetError();
    }
  }, [formParams]);

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
                className={inputNameClass}
                name="name"
                minLength={2}
                maxLength={30}
                pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
                required
                value={formParams.name}
                onChange={handleChangeFormParam}
                placeholder="name"
              />
              <span className="form__error">{errorMessage.name}</span>
            </fieldset>
          ) : null}

          <fieldset className="form__fieldset">
            <label className="form__label">Email</label>
            <input
              type="email"
              className={inputEmailClass}
              name="email"
              minLength={2}
              maxLength={30}
              pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
              required
              value={formParams.email}
              onChange={handleChangeFormParam}
              placeholder="email"
            />
            <span className="form__error">{errorMessage.email}</span>
          </fieldset>

          <fieldset className="form__fieldset">
            <label className="form__label">Пароль</label>
            <input
              type="password"
              className={inputPasswordClass}
              name="password"
              value={formParams.password}
              onChange={handleChangeFormParam}
              required
              placeholder="password"
            />
          </fieldset>

          <span className="form__error">{errorMessage.password}</span>
        </div>
        <span className="form__error form__error_common">
          {authError || ""}
        </span>
        <button
          className={btnClass}
          type="submit"
          onClick={handleBtnClick}
          disabled={!formIsValid}
        >
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
