import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { movies } from "../../../utils/constants/movies";
import "./MoviesCardList.css";

export default function MoviesCardList() {
  return (
    <section className="movies">
      <div className="movies__card-list">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} card={movie} />
        ))}
      </div>
      <button className="movies__btn">Еще</button>
    </section>
  );
}
