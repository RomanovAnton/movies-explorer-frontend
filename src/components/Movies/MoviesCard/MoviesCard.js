import React, { useState } from "react";
import btnAdded from "../../../images/movie-card__btn-added.svg";
import btnClose from "../../../images/movie-card__btn-close.svg";

import "./MoviesCard.css";

export default function MoviesCard({ card, btnType }) {
  const cardImage = ` https://api.nomoreparties.co/${card.image.url}`;
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="card">
      <div className="card__info">
        <p className="card__title">{card.nameRU}</p>
        <p className="card__duration">{card.duration} минута</p>
      </div>
      <img className="card__image" src={cardImage} alt={card.nameRU} />

      {btnType === "saved" ? (
        <button className="card__btn">
          <img src={btnClose} alt="delete" />
        </button>
      ) : (
        <button
          className={`card__btn ${isSaved ? "card__btn_active" : ""}`}
          onClick={() => setIsSaved(!isSaved)}
        >
          {isSaved ? <img src={btnAdded} alt="added" /> : "Сохранить"}
        </button>
      )}
    </div>
  );
}
