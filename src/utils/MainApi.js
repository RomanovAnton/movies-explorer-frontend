class MainApi {
  _fetch(path, method = "GET", body) {
    const token = localStorage.getItem("token");
    return fetch(`https://movies.rmv.api.nomoredomains.sbs${path}`, {
      method: method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  register(data) {
    return this._fetch("/signup", "POST", data);
  }

  login(data) {
    return this._fetch("/signin", "POST", data);
  }

  checkToken() {
    return this._fetch("/users/me");
  }

  updateProfile(data) {
    return this._fetch("/users/me", "PATCH", data);
  }

  addSavedMovie(data) {
    return this._fetch("/movies", "POST", data);
  }

  deleteSavedMovie(_id) {
    return this._fetch(`/movies/${_id}`, "DELETE", {});
  }

  getSavedMovies() {
    return this._fetch(`/movies`);
  }
}

export const mainApi = new MainApi();
