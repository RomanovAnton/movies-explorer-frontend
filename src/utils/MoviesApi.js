const options = {
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
};

export const getMovies = () => {
  return fetch(options.baseUrl, {
    headers: options.headers,
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
};
