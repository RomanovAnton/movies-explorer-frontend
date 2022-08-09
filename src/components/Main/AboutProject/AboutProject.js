import React from "react";
import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>

        <div className="about-project__description">
          <div className="description__item">
            <p className="item__title">Дипломный проект включал 5 этапов</p>
            <p className="item__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>

          <div className="description__item">
            <p className="item__title">На выполнение диплома ушло 5 недель</p>
            <p className="item__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>

        <div className="about-project__time-line">
          <div className="time-line__item">
            <div className="time-line__length">1 неделя</div>
            <p className="time-line__caption">Back-end</p>
          </div>
          <div className="time-line__item time-line__item_long">
            <div className="time-line__length time-line__length_long ">
              4 недели
            </div>
            <p className="time-line__caption">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}
