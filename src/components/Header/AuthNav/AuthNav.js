import React from "react";
import { Link } from "react-router-dom";
import "./AuthNav.css";

export default function AuthNav() {
  return (
    <div className="auth-nav-menu">
      <Link to="/sign-up" className="auth-nav-menu__link">
        Регистрация
      </Link>
      <Link
        to="/sign-in"
        className="auth-nav-menu__link auth-nav-menu__link_btn"
      >
        Войти
      </Link>
    </div>
  );
}
