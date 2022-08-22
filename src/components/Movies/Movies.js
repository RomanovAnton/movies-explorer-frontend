import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { moviesApi } from "../../utils/MoviesApi";
import { filterMovies } from "../../utils/filterMovies";
import Popup from "../Popup/Popup";
import Preloader from "./Preloader/Preloader";
import "./Movies.css";

export default function Movies({ openPopup }) {
  const [movies, setMovies] = useState([]);
  const [preloaderActive, setPreloaderActive] = useState(false);

  useEffect(() => {
    const serverData = localStorage.getItem("all-movies");
    if (!serverData) {
      return;
    }
    const filteredMovies = filterMovies();
    setMovies(filteredMovies);
  }, []);

  const renderMovies = () => {
    const filteredMovies = filterMovies();
    setMovies(filteredMovies);
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
        />
        {preloaderActive ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList movies={movies} />
            <button className="movies__btn">Еще</button>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
