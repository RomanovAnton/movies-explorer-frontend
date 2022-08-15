import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

export default function MoviesCardList({ movies, btnType }) {
  return (
    <section className="movies">
      <div className="movies__card-list">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} card={movie} btnType={btnType} />
        ))}
      </div>
    </section>
  );
}
