import React from "react";
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__caption">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__info">
          <p className="footer__copyright">© 2022</p>
          <ul className="footer__nav">
            <li>
              <a
                href="https://practicum.yandex.ru/"
                className="footer__nav-item"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                href="https://github.com/RomanovAnton"
                className="footer__nav-item"
              >
                Github
              </a>
            </li>
            <li>
              <a href="https://t.me/AntRmv" className="footer__nav-item">
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
