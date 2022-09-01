import { SHORT_MOVIES_DURATION } from "../utils/constants/constants";

export const filterMovies = (movies, isShortMovies, searchText) => {
  const moviesArr = movies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchText)
  );

  if (isShortMovies === "yes") {
    return moviesArr.filter((item) => item.duration <= SHORT_MOVIES_DURATION);
  } else {
    return moviesArr;
  }
};
