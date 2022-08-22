class MoviesApi {
  constructor(options) {
    this._options = options;
  }

  getMovies() {
    return fetch(this._options.baseUrl, {
      headers: this._options.headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});
