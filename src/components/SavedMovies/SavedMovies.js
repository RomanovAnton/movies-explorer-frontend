import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { savedMovies } from "../../utils/constants/saved-movies";
import Preloader from "../Movies/Preloader/Preloader";
import "./SavedMovies.css";

export default function SavedMovies() {
  return (
    <>
      <Header />
      <main className="main">
        <SearchForm />
        <MoviesCardList movies={savedMovies} btnType={"saved"} />
        <button className="movies__btn">Еще</button>
      </main>
      <Footer />
    </>
  );
}
