import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { filterMovies } from "../../utils/filterMovies";
import Preloader from "./Preloader/Preloader";
import "./Movies.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const renderMovies = () => {
    setMovies(filterMovies());
  };

  return ( 
    <>
      <Header loggedIn={true} />
      <main className="main">
        <SearchForm renderMovies={renderMovies} />
        <MoviesCardList movies={movies} />
        <button className="movies__btn">Еще</button>
      </main>
      <Footer />
    </>
  );
}
