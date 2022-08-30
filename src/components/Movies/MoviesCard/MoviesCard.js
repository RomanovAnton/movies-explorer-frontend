import React, { useState, useEffect, useContext } from "react";
import btnAdded from "../../../images/movie-card__btn-added.svg";
import btnClose from "../../../images/movie-card__btn-close.svg";
import { SavedMoviesContext } from "../../../contexts/SavedMoviesContext";
import "./MoviesCard.css";

export default function MoviesCard({ card, type, onSaveMovie, onDeleteMovie }) {
  const savedMovies = useContext(SavedMoviesContext);
  const cardImage =
    type === "saved"
      ? card.image
      : ` https://api.nomoreparties.co/${card.image.url}`;

  const [isSaved, setIsSaved] = useState(false);

  const saveMovie = () => {
    onSaveMovie(card);
  };

  const isSavedMovie = () => {
    const isSaved = savedMovies.find((item) => item.movieId === card.id);
    setIsSaved(isSaved);
  };

  const deleteMovie = () => {
    let movieId24Sign;
    if (type === "all") {
      movieId24Sign = savedMovies.filter((item) => item.movieId === card.id)[0]
        ._id;
      onDeleteMovie(movieId24Sign);
      return;
    }
    onDeleteMovie(card._id);
  };

  const declOfNum = (number, words) => {
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ];
  };

  useEffect(() => {
    isSavedMovie();
  }, [savedMovies]);

  return (
    <div className="card">
      <div className="card__info">
        <p className="card__title">{card.nameRU}</p>
        <p className="card__duration">
          {`${card.duration} ${declOfNum(card.duration, [
            "минута",
            "минуты",
            "минут",
          ])}`}{" "}
        </p>
      </div>
      <a
        href={card.trailerLink}
        target="_blank"
        className="card__link"
        rel="noreferrer"
      >
        <img className="card__image" src={cardImage} alt={card.nameRU} />
      </a>

      {type === "saved" ? (
        <button className="card__btn" onClick={deleteMovie}>
          <img src={btnClose} alt="delete" />
        </button>
      ) : (
        <>
          {isSaved ? (
            <button
              className="card__btn card__btn_active"
              onClick={deleteMovie}
            >
              <img src={btnAdded} alt="added" />
            </button>
          ) : (
            <button className="card__btn" onClick={saveMovie}>
              Сохранить
            </button>
          )}
        </>
      )}
    </div>
  );
}
