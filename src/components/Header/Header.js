import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import logo from "../../images/logo-min.svg";
import AuthNav from "../Header/AuthNav/AuthNav";
import MoviesNav from "../Header/MoviesNav/MoviesNav";
import "./Header.css";

export default function Header({ theme, type, loggedIn }) {
  const headerClass = classNames("header", {
    "header_colour_dark": theme === "dark",
  });

  const headerContainerClass = classNames("header__container", {
    "header__container_size_form": type === "form",
  });

  return (
    <header className={headerClass}>
      <div className={headerContainerClass}>
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
        {type === "form" ? null : loggedIn ? <MoviesNav /> : <AuthNav />}
      </div>
    </header>
  );
}
