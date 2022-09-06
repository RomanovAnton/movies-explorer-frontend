import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import useForm from "../../hooks/useForm";

export default function Profile({
  onSignOut,
  onUpdate,
  authError,
  onResetError,
}) {
  const currentUser = useContext(CurrentUserContext);
  const form = useForm();

  useEffect(() => {
    form.setFormParams({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);

  const handleBtnClick = (evt) => {
    evt.preventDefault();
    onUpdate(form.formParams);
    form.setFormIsValid(false);
  };

  const inputNameClass = classNames("profile__input", {
    "profile__input_error": form.errorMessage.name,
  });

  const inputEmailClass = classNames("profile__input", {
    "profile__input_error": form.errorMessage.email,
  });

  const classBtn = classNames("profile__btn", "profile__btn_type_edit", {
    "profile__btn_disabled": !form.formIsValid,
  });

  useEffect(() => {
    onResetError();
    form.checkDataIsChanged(currentUser);
  }, [form.formParams]);

  return (
    <>
      <Header loggedIn={true} />
      <main className="profile">
        <section className="profile__container">
          <form className="profile__form" name="form" noValidate>
            <h1 className="profile__title">
              {`Привет, ${currentUser.name || ""}`}
            </h1>

            <fieldset className="profile__fieldset">
              <label className="profile__label">Имя</label>
              <input
                className={inputNameClass}
                name="name"
                type="text"
                minLength={2}
                maxLength={30}
                pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
                required
                placeholder="name"
                value={form.formParams.name || ""}
                onChange={form.handleChangeValue}
              />
            </fieldset>
            <span className="profile__error">
              {form.errorMessage.name || ""}
            </span>

            <fieldset className="profile__fieldset">
              <label className="profile__label">E-mail</label>
              <input
                className={inputEmailClass}
                name="email"
                type="email"
                minLength={2}
                maxLength={30}
                pattern="^[\w]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$"
                required
                placeholder="email"
                value={form.formParams.email || ""}
                onChange={form.handleChangeValue}
              />
            </fieldset>
            <span className="profile__error">
              {form.errorMessage.email || ""}
            </span>

            <span className="profile__error_common">{authError}</span>

            <button
              className={classBtn}
              type="submit"
              onClick={handleBtnClick}
              disabled={!form.formIsValid}
            >
              Редактировать
            </button>
            <button className=" profile__btn">
              <div className="profile__btn_type_link" onClick={onSignOut}>
                Выйти из аккаунта
              </div>
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
