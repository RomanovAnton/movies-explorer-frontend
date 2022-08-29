import React, { useState, useContext, useEffect } from "react";
import classNames from "classnames";
import Header from "../Header/Header";
import ProfileButtons from "./ProfileButtons/ProfileButtons";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

export default function Profile({
  onSignOut,
  onUpdate,
  authError,
  onResetError,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [formStatusEdit, setFormStatusEdit] = useState(false);
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
    if (formStatusEdit) {
      evt.preventDefault();
      onUpdate(formParams)
    } else {
      setFormStatusEdit(!formStatusEdit);
      setFormIsValid(false);
    }
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

  useEffect(() => {
    if (authError) {
      onResetError();
    }
  }, [formParams]);

  return (
    <>
      <Header loggedIn={true} />
      <main className="profile">
        <section className="profile__container">
          <form className="profile__form" name="edit-form" noValidate>
            <h1 className="profile__title">{`Привет, ${
              currentUser.name || ""
            }`}</h1>

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
                disabled={!formStatusEdit}
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
                disabled={!formStatusEdit}
              />
            </fieldset>
            <span className="profile__error">{errorMessage.email || ""}</span>
            <ProfileButtons
              formStatusEdit={formStatusEdit}
              handleBtnClick={handleBtnClick}
              onSignOut={onSignOut}
              formIsValid={formIsValid}
              authError={authError}
              onResetError={onResetError}
            />
          </form>
        </section>
      </main>
    </>
  );
}
