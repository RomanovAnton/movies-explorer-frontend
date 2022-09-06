import React from "react";
import { Link } from "react-router-dom";
import "./AuthNav.css";

export default function AuthNav() {
  return (
    <div className="auth-nav">
      <Link to="/sign-up" className="auth-nav__link">
        Регистрация
      </Link>
      <Link
        to="/sign-in"
        className="auth-nav__link auth-nav__link_btn"
      >
        Войти
      </Link>
    </div>
  );
}
