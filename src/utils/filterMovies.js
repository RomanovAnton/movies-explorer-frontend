export const filterMovies = () => {
  const allMovies = JSON.parse(localStorage.getItem("all-movies"));
  const isShortMovies = localStorage.getItem("is-short-movies");
  const searchText = localStorage.getItem("search-text");


  const moviesArr = allMovies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchText)
  );

  if (isShortMovies === "yes") {
    return moviesArr.filter((movie) => movie.duration <= 40);
  } else {
    return moviesArr;
  }
};
