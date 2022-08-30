export const filterMovies = (movies, isShortMovies, searchText) => {
  const moviesArr = movies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchText)
  );

  if (isShortMovies === "yes") {
    return moviesArr.filter((item) => item.duration <= 40);
  } else {
    return moviesArr;
  }
};
