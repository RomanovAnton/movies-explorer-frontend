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

export const filterSavedMovies = (savedMovies, searchData) => {
  let moviesArr;
  const { searchText, isShortMovies } = searchData;
  moviesArr = savedMovies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchText)
  );

  if (isShortMovies === "yes") {
    moviesArr.filter((movie) => movie.duration <= 40);
  }

  if (moviesArr.length > 0) {
    return moviesArr;
  }
};

//можно объединить в зависимсоти от типа логика
// если filterSavedMovies ничего не возвращает то отобразить сохраненные фильмы и открыть попап с ошибкой
