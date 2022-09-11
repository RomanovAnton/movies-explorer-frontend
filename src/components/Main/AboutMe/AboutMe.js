import React from "react";
import photo from "../../../images/photo.png";
import Portfolio from "../Portfolio/Portfolio";

import "./AboutMe.css";

export default function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="person">
          <div className="person__info">
            <p className="person__name">Антон</p>
            <p className="person__job">Фронтенд-разработчик, 27 лет</p>
            <p className="person__about">
              В своей работе сталкивался с тем что приходилось выполнять
              однотипные действия, которые повторялись из раза в раз, появилось
              желание сократить время на их выполнение и написать первый код.
            </p>
            <ul className="person__link-list">
              <li>
                <a
                  className="person__link-item"
                  href="https://t.me/antrmv25"
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  className="person__link-item"
                  href="https://github.com/RomanovAnton"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img className="person__image" src={photo} alt="avatar" />
        </div>
        <Portfolio />
      </div>
    </section>
  );
}
