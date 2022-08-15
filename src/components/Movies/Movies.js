import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { movies } from "../../utils/constants/movies";
import Preloader from "./Preloader/Preloader";
import "./Movies.css";

export default function Movies() {
  return (
    <>
      <Header />
      <main className="main">
        <SearchForm />
        <MoviesCardList movies={movies} />
        <button className="movies__btn">Еще</button>
      </main>
      <Footer />
    </>
  );
}
