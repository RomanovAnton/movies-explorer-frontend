import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";
import { filterSavedMovies } from "../../utils/filterMovies";
import "./SavedMovies.css";

export default function SavedMovies({ onDeleteMovie, openPopup }) {
  const savedMovies = useContext(SavedMoviesContext);
  const [displayMovies, setDisplayMovies] = useState(savedMovies);

  const renderSavedMovies = (searchData) => {
    const filteredMovies = filterSavedMovies(savedMovies, searchData);
    if (!filteredMovies) {
      openPopup("По вашему запросу ничего не найдено");
      return;
    }
    setDisplayMovies(filteredMovies);
  };
  useEffect(() => {
    setDisplayMovies(savedMovies);
  }, [savedMovies]);

  return (
    <>
      <Header loggedIn={true} />
      <main className="main">
        <SearchForm type={"saved"} renderSavedMovies={renderSavedMovies} />
        {savedMovies ? (
          <MoviesCardList
            movies={displayMovies}
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
