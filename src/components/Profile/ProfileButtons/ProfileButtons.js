import React from "react";
import classNames from "classnames";
import "./ProfileButtons.css";

export default function ProfileButtons({
  formStatusEdit,
  handleBtnClick,
  error,
  onSignOut,
  formIsValid,
  authError,
}) {
  const classSaveBtn = classNames("profile__btn", "profile__btn_type_save", {
    "profile__btn_disabled": !formIsValid,
  });

  return (
    <>
      {formStatusEdit ? (
        <>
          {error && <span className="profile__error">{authError || ""}</span>}
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
            <div className="profile__btn_type_link" onClick={onSignOut}>
              Выйти из аккаунта
            </div>
          </button>
        </>
      )}
    </>
  );
}
