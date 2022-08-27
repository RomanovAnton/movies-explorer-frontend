import React, { useState, useContext } from "react";
import Header from "../Header/Header";
import ProfileButtons from "./ProfileButtons/ProfileButtons";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

export default function Profile({ onSignOut, onUpdate }) {
  const currentUser = useContext(CurrentUserContext);
  const [formStatusEdit, setFormStatusEdit] = useState(false);
  const [error, setError] = useState(false);
  const [formParams, setFormParams] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBtnClick = (evt) => {
    evt.preventDefault();
    if (formStatusEdit) {;
      onUpdate(formParams);
    }
    setFormStatusEdit(!formStatusEdit);
  };

  return (
    <>
      <Header loggedIn={true} />
      <main className="profile">
        <section className="profile__container">
          <form className="profile__form" name="edit-form" noValidate>
            <h1 className="profile__title">{`Привет, ${
              currentUser.name ?? ""
            }`}</h1>

            <fieldset className="profile__fieldset">
              <label className="profile__label">Имя</label>
              <input
                className="profile__input"
                name="name"
                type="text"
                minLength={2}
                maxLength={30}
                value={formParams.name}
                onChange={handleInputChange}
                disabled={!formStatusEdit}
              />
            </fieldset>

            <fieldset className="profile__fieldset">
              <label className="profile__label">E-mail</label>
              <input
                className="profile__input"
                name="email"
                type="email"
                minLength={2}
                maxLength={30}
                value={formParams.email}
                onChange={handleInputChange}
                disabled={!formStatusEdit}
              />
            </fieldset>
            <ProfileButtons
              formStatusEdit={formStatusEdit}
              handleBtnClick={handleBtnClick}
              error={error}
              onSignOut={onSignOut}
            />
          </form>
        </section>
      </main>
    </>
  );
}
