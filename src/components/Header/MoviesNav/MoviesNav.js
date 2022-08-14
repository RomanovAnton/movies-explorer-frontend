import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./MoviesNav.css";

export default function MoviesNav() {
  return (
    <ul className="movies-nav">
      <li>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive
              ? "movies-nav__link movies-nav__link_active"
              : "movies-nav__link"
          }
        >
          Фильмы
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            isActive
              ? "movies-nav__link movies-nav__link_active"
              : "movies-nav__link"
          }
        >
          Сохраненные фильмы
        </NavLink>
      </li>

      <li>
        <Link to="/profile" className="movies-nav__link movies-nav__link_btn">
          Аккаунт
        </Link>
      </li>
    </ul>
  );
}
