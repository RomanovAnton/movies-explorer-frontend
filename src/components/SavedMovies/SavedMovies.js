import React, { useContext } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";
import "./SavedMovies.css";

export default function SavedMovies({ onDeleteMovie }) {
  const savedMovies = useContext(SavedMoviesContext);

  return (
    <>
      <Header loggedIn={true} />
      <main className="main">
        <SearchForm />
        {savedMovies ? (
          <MoviesCardList
            movies={savedMovies}
            type={"saved"}
            onDeleteMovie={onDeleteMovie}
          />
        ) : (
          "Сохраненных фильмов пока нет"
        )}
      </main>
      <Footer />
    </>
  );
}
