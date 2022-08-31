import classNames from "classnames";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import "./Form.css";

export default function Form({
  type,
  onRegister,
  onLogin,
  authError,
  onResetError,
}) {
  const form = useForm();

  const handleBtnClick = (evt) => {
    evt.preventDefault();
    if (type === "register") {
      onRegister(form.formParams);
    } else {
      onLogin(form.formParams);
    }
    form.setFormIsValid(false);
  };

  const btnClass = classNames("form__button", {
    "form__button_disabled": !form.formIsValid,
  });

  const inputNameClass = classNames("form__input", {
    "form__input_error": form.errorMessage.name,
  });

  const inputEmailClass = classNames("form__input", "form__input_text_bold", {
    "form__input_error": form.errorMessage.email,
  });

  const inputPasswordClass = classNames("form__input", {
    "form__input_error": form.errorMessage.password,
  });

  useEffect(() => {
    if (authError) {
      onResetError();
    }
  }, [form.formParams]);

  return (
    <section className="form-container">
      <h1 className="form-container__title">
        {type === "register" ? "Добро пожаловать!" : "Рады видеть!"}
      </h1>
      <form className="form" noValidate name="form">
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
                value={form.formParams.name}
                onChange={form.handleChangeValue}
                placeholder="name"
              />
              <span className="form__error">{form.errorMessage.name}</span>
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
              value={form.formParams.email}
              onChange={form.handleChangeValue}
              placeholder="email"
            />
            <span className="form__error">{form.errorMessage.email}</span>
          </fieldset>

          <fieldset className="form__fieldset">
            <label className="form__label">Пароль</label>
            <input
              type="password"
              className={inputPasswordClass}
              name="password"
              value={form.formParams.password}
              onChange={form.handleChangeValue}
              required
              placeholder="password"
            />
          </fieldset>

          <span className="form__error">{form.errorMessage.password}</span>
        </div>
        <span className="form__error form__error_common">
          {authError || ""}
        </span>
        <button
          className={btnClass}
          type="submit"
          onClick={handleBtnClick}
          disabled={!form.formIsValid}
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
