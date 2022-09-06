import React from "react";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <div className="container">
        <p className="portfolio__caption">Портфолио</p>
        <ul className="portfolio__list">
          <li className="portfolio__list-item">
            <a
              className="porfolio__link"
              href="https://romanovanton.github.io/how-to-learn/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Статичный сайт
              <p className="portfolio__link-icon">↗</p>
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              className="porfolio__link"
              href="https://romanovanton.github.io/russian-travel/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт
              <p className="portfolio__link-icon">↗</p>
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              className="porfolio__link"
              href="https://romanovanton.github.io/react-mesto-auth/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Одностраничное приложение
              <p className="portfolio__link-icon">↗</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
