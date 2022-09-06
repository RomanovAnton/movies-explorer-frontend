import React from "react";
import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  let navigate = useNavigate();
  const handleLinkClick = () => {
    navigate(-1);
  };
  return (
    <main className="not-found-page">
      <h1 className="not-found-page__title">404</h1>
      <p className="not-found-page__caption">Страница не найдена</p>
      <button className="not-found-page__btn" onClick={handleLinkClick}>
        Назад
      </button>
    </main>
  );
}
