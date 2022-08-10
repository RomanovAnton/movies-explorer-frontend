import React from "react";
import photo from "../../../images/photo.png";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>

        <div className="profile">
          

          <div className="profile__info">
            <p className="profile__name">Антон</p>
            <p className="profile__job">Фронтенд-разработчик, 27 лет</p>
            <p className="profile__about">
              В своей работе сталкивался с тем что приходилось выполнять
              однотипные действия, которые повторялись из раза в раз, появилось
              желание сократить время на их выполнение и написать первый код.
            </p>
            <ul className="profile__link-list">
              <li>
                <a
                  className="profile__link-item"
                  href="https://t.me/AntRmv"
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  className="profile__link-item"
                  href="https://github.com/RomanovAnton"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img className="profile__image" src={photo} alt="avatar" />
        </div>

        <div className="portfolio">
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
              </a>
              <div className="portfolio__link-icon"></div>
            </li>
            <li className="portfolio__list-item">
              <a
                className="porfolio__link"
                href="https://romanovanton.github.io/russian-travel/index.html"
                target="_blank"
                rel="noreferrer"
              >
                Адаптивный сайт
              </a>
              <div className="portfolio__link-icon"></div>
            </li>
            <li className="portfolio__list-item">
              <a
                className="porfolio__link"
                href="https://romanovanton.github.io/react-mesto-auth/index.html"
                target="_blank"
                rel="noreferrer"
              >
                Одностраничное приложение
              </a>
              <div className="portfolio__link-icon"></div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
