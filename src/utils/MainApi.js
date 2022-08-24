const options = {
  baseUrl: "http://movies.rmv.api.nomoredomains.sbs",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
};

export const register = (data) => {
  return fetch(`${options.baseUrl}/signup`, {
    method: "POST",
    headers: options.headers,
    body: JSON.stringify(data),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
};
