import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./ProfileButtons.css";

export default function ProfileButtons({
  formStatusEdit,
  handleBtnClick,
  error,
}) {
  const classSaveBtn = classNames("profile__btn", {
    "profile__btn_type_save profile__btn_disabled": error,
    "profile__btn_type_save": true,
  });

  return (
    <>
      {formStatusEdit ? (
        <>
          {error && (
            <span className="profile__error">
              При обновлении профиля произошла ошибка.
            </span>
          )}
          <button
            className={classSaveBtn}
            type="submit"
            onClick={handleBtnClick}
            disabled={error}
          >
            Сохранить
          </button>
        </>
      ) : (
        <>
          <button
            className="profile__btn profile__btn_type_edit"
            type="submit"
            onClick={handleBtnClick}
          >
            Редактировать
          </button>
          <button className=" profile__btn">
            <Link to="./sign-in" className="profile__btn_type_link">
              Выйти из аккаунта
            </Link>
          </button>
        </>
      )}
    </>
  );
}
