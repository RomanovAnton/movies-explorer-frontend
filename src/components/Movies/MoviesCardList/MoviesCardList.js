import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

export default function MoviesCardList({
  movies,
  type,
  onSaveMovie,
  onDeleteMovie,
}) {
  return (
    <section className="movies">
      <div className="movies__card-list">
        {movies.map((movie) => (
          <MoviesCard
            key={type === "saved" ? movie._id : movie.id}
            card={movie}
            type={type}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
          />
        ))}
      </div>
    </section>
  );
}
