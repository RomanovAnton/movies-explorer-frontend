import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo-min.svg";
import AuthNav from "../Header/AuthNav/AuthNav";
import MoviesNav from "../Header/MoviesNav/MoviesNav";
import "./Header.css";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <header className={`header ${loggedIn ? "header_colour_main" : ""}`}>
      <div className="header__container">
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
        {loggedIn ? <MoviesNav /> : <AuthNav />}
      </div>
    </header>
  );
}
