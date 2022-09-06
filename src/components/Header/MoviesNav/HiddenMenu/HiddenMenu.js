import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./HiddenMenu.css";

export default function HiddenMenu() {
  return (
    <div className="hidden-menu__wrapper">
      <div className="hidden-menu__container">
        <div className="hidden-menu__close"></div>
        <ul className="hidden-nav">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "hidden-nav__link hidden-nav__link_active"
                  : "hidden-nav__link"
              }
            >
              Главная
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive
                  ? "hidden-nav__link hidden-nav__link_active"
                  : "hidden-nav__link"
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
                  ? "hidden-nav__link hidden-nav__link_active"
                  : "hidden-nav__link"
              }
            >
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <Link to="/profile" className="hidden-nav__link hidden-nav__link_btn">
          Аккаунт
        </Link>
      </div>
    </div>
  );
}
