import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { filterMovies } from "../../utils/filterMovies";
import { ERROR_NOT_FOUND_SEARCH_TEXT } from "../../utils/constants/constants";
import Preloader from "./Preloader/Preloader";
import "./Movies.css";

export default function Movies({ openPopup, onSaveMovie, onDeleteMovie }) {
  const [movies, setMovies] = useState([]);
  const [preloaderActive, setPreloaderActive] = useState(false);
  const [numDisplayedMovies, setNumDisplayedMovies] = useState(0);
  const [numAddedMovies, setNumAddedMovies] = useState(0);

  console.log(movies);

  useEffect(() => {
    const serverData = localStorage.getItem("all-movies");
    if (serverData) {
      const filteredMovies = filterMovies();
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
      setNumDisplayedMovies(5);
      setNumAddedMovies(2);
      return;
    }
    if (width > 480 && width < 769) {
      setNumDisplayedMovies(8);
      setNumAddedMovies(2);
      return;
    }
    setNumDisplayedMovies(12);
    setNumAddedMovies(3);
  };

  const renderMovies = () => {
    const filteredMovies = filterMovies();
    setMovies(filteredMovies);
    if (filteredMovies.length === 0) {
      openPopup(ERROR_NOT_FOUND_SEARCH_TEXT);
      return;
    }
  };

  const addMovies = () => {
    setNumDisplayedMovies((prev) => prev + numAddedMovies);
  };

  const openPreloader = () => {
    setPreloaderActive(true);
  };

  const closePreloader = () => {
    setPreloaderActive(false);
  };

  return (
    <>
      <Header loggedIn={true} />
      <main className="main">
        <SearchForm
          renderMovies={renderMovies}
          openPopup={openPopup}
          openPreloader={openPreloader}
          closePreloader={closePreloader}
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
