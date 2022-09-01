import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { filterMovies } from "../../utils/filterMovies";
import {
  ERROR_NOT_FOUND_SEARCH_TEXT,
  NUM_MOVIES_LESS_1280,
  NUM_MOVIES_LESS_769,
  NUM_MOVIES_LESS_480,
  STEP_LESS_1280,
  STEP_LESS_769,
} from "../../utils/constants/constants";
import Preloader from "./Preloader/Preloader";
import "./Movies.css";

export default function Movies({ openPopup, onSaveMovie, onDeleteMovie }) {
  const [movies, setMovies] = useState([]);
  const [preloaderActive, setPreloaderActive] = useState(false);
  const [numDisplayedMovies, setNumDisplayedMovies] = useState(0);
  const [numAddedMovies, setNumAddedMovies] = useState(0);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("all-movies"));
    const isShortMovies = localStorage.getItem("is-short-movies");
    const searchText = localStorage.getItem("search-text");
    if (movies && isShortMovies && searchText) {
      const filteredMovies = filterMovies(movies, isShortMovies, searchText);
      setMovies(filteredMovies);
    }

    determineWidth(window.innerWidth);
    window.addEventListener("resize", (evt) => {
      setTimeout(() => determineWidth(evt.target.innerWidth), 1000);
    });
    return window.removeEventListener("resize", (evt) => {
      setTimeout(() => determineWidth(evt.target.innerWidth), 1000);
    });
  }, []);

  const determineWidth = (width) => {
    if (width < 481) {
      setNumDisplayedMovies(NUM_MOVIES_LESS_480);
      setNumAddedMovies(STEP_LESS_769);
      return;
    }
    if (width > 480 && width < 769) {
      setNumDisplayedMovies(NUM_MOVIES_LESS_769);
      setNumAddedMovies(STEP_LESS_769);
      return;
    }
    setNumDisplayedMovies(NUM_MOVIES_LESS_1280);
    setNumAddedMovies(STEP_LESS_1280);
  };

  const renderMovies = () => {
    const movies = JSON.parse(localStorage.getItem("all-movies"));
    const isShortMovies = localStorage.getItem("is-short-movies");
    const searchText = localStorage.getItem("search-text");
    const filteredMovies = filterMovies(movies, isShortMovies, searchText);
    setMovies(filteredMovies);
    if (filteredMovies.length === 0) {
      openPopup(ERROR_NOT_FOUND_SEARCH_TEXT);
      return;
    }
  };

  const addMovies = () => {
    setNumDisplayedMovies((prev) => prev + numAddedMovies);
  };

  return (
    <>
      <Header loggedIn={true} />
      <main className="main">
        <SearchForm
          renderMovies={renderMovies}
          openPopup={openPopup}
          setPreloader={setPreloaderActive}
          type={"all"}
        />
        {preloaderActive ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList
              movies={movies.slice(0, numDisplayedMovies)}
              type={"all"}
              onDeleteMovie={onDeleteMovie}
              onSaveMovie={onSaveMovie}
            />
            {numDisplayedMovies < movies.length && numDisplayedMovies > 2 ? (
              <button className="movies__btn" onClick={addMovies}>
                Еще
              </button>
            ) : null}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
