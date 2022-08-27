const options = {
  baseUrl: "http://movies.rmv.api.nomoredomains.sbs",
  headers: {
    "Content-type": "application/json",
    // Accept: "application/json",
  },
};

export const register = (data) => {
  return fetch(`${options.baseUrl}/signup`, {
    method: "POST",
    headers: options.headers,
    body: JSON.stringify(data),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
};

export const login = (data) => {
  return fetch(`${options.baseUrl}/signin`, {
    method: "POST",
    headers: options.headers,
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
};

export const checkToken = (token) => {
  return fetch(`${options.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
};

export const updateProfile = (data) => {
  const token = localStorage.getItem("token");
  return fetch(`${options.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
};

export const addSavedMovie = (data) => {
  const cardImage = `https://api.nomoreparties.co/${data.image.url}`;
  const token = localStorage.getItem("token");
  return fetch(`${options.baseUrl}/movies`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: cardImage,
      trailerLink: data.trailerLink,
      thumbnail: cardImage,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
};

export const deleteSavedMovie = (_id) => {
  console.log(_id);
  const token = localStorage.getItem("token");
  return fetch(`${options.baseUrl}/movies/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
};

export const getSavedMovies = () => {
  const token = localStorage.getItem("token");
  return fetch(`${options.baseUrl}/movies`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
};
