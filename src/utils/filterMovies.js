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
  const searchText = searchData.searchText;
  const isShortMovies = searchData.isShortMovies ? "no" : "yes";

  const filterByDuration = (arr, duration) => {
    return arr.filter((item) => item.duration <= duration);
  };

  const filterByText = (arr) => {
    return arr.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchText)
    );
  };

  if (!searchText) {
    moviesArr = filterByDuration(savedMovies, 40);
  }

  if (isShortMovies === "yes") {
    moviesArr = filterByDuration(filterByText(savedMovies), 40);
  } else {
    moviesArr = filterByText(savedMovies);
  }

  return moviesArr;
};

//можно объединить в зависимсоти от типа логика
