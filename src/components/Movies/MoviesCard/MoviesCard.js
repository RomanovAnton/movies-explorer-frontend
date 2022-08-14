import React, { useState } from "react";
import mark from "../../../images/mark.svg";

import "./MoviesCard.css";

export default function MoviesCard({ card }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="card">
      <div className="card__info">
        <p className="card__title">{card.nameRU}</p>
        <p className="card__duration">{card.duration} минута</p>
      </div>
      <img className="card__image" src={card.image} alt={card.nameRU} />
      <button
        className={`card__btn ${isSaved ? "card__btn_active" : ""}`}
        onClick={() => setIsSaved(!isSaved)}
      >
        {isSaved ? <img src={mark} alt="search" /> : "Сохранить"}
      </button>
    </div>
  );
}
