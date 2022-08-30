import React, { useState, useContext, useEffect } from "react";
import classNames from "classnames";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

export default function Profile({
  onSignOut,
  onUpdate,
  authError,
  onResetError,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [formParams, setFormParams] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
  });

  const handleChangeFormParam = (evt) => {
    const { name, value } = evt.target;
    const form = evt.target.closest(".profile__form");

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
    onUpdate(formParams);
  };

  const inputNameClass = classNames("profile__input", {
    "profile__input_error": errorMessage.name,
  });
  const inputEmailClass = classNames(
    "profile__input",
    "profile__input_text_bold",
    {
      "profile__input_error": errorMessage.email,
    }
  );
  const classBtn = classNames("profile__btn", "profile__btn_type_edit", {
    "profile__btn_disabled": !formIsValid,
  });

  useEffect(() => {
    onResetError();
  }, [formParams]);

  useEffect(() => {
    if (authError) {
      setFormIsValid(false);
    }
  }, [authError]);

  return (
    <>
      <Header loggedIn={true} />
      <main className="profile">
        <section className="profile__container">
          <form className="profile__form" name="edit-form" noValidate>
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
                value={formParams.name}
                onChange={handleChangeFormParam}
              />
            </fieldset>
            <span className="profile__error">{errorMessage.name || ""}</span>

            <fieldset className="profile__fieldset">
              <label className="profile__label">E-mail</label>
              <input
                className={inputEmailClass}
                name="email"
                type="email"
                minLength={2}
                maxLength={30}
                pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
                required
                value={formParams.email}
                onChange={handleChangeFormParam}
              />
            </fieldset>
            <span className="profile__error">{errorMessage.email || ""}</span>

            <span className="profile__error_common">{authError}</span>

            <button
              className={classBtn}
              type="submit"
              onClick={handleBtnClick}
              disabled={!formIsValid}
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
