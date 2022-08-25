import React, { useState } from "react";
import Header from "../Header/Header";
import ProfileButtons from "./ProfileButtons/ProfileButtons";
import "./Profile.css";

export default function Profile({ onSignOut }) {
  const { name, email } = { name: "Anton", email: "fsd@ya.ru" };
  const [inputName, setInputName] = useState("Anton");
  const [inputEmail, setInputEmail] = useState("123@123.ru");
  const [formStatusEdit, setFormStatusEdit] = useState(false);
  const [error, setError] = useState(false);

  const handleInputName = (evt) => {
    setInputName(evt.target.value);
  };

  const handleInputEmail = (evt) => {
    setInputEmail(evt.target.value);
  };

  const handleBtnClick = (evt) => {
    evt.preventDefault();
    setFormStatusEdit(!formStatusEdit);
  };

  return (
    <>
      <Header loggedIn={true} />
      <main className="profile">
        <section className="profile__container">
          <form className="profile__form" name="edit-form" noValidate>
            <h1 className="profile__title">{`Привет, ${name}`}</h1>

            <fieldset className="profile__fieldset">
              <label className="profile__label">Имя</label>
              <input
                className="profile__input"
                name="name"
                type="text"
                minLength={2}
                maxLength={30}
                value={inputName}
                onChange={handleInputName}
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
                value={inputEmail}
                onChange={handleInputEmail}
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
