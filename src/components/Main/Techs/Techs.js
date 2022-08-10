import React from "react";
import "./Techs.css";

export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <p className="techs__sub-title">7 технологий</p>
        <p className="techs__caption">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="tech__list">
          <li className="list__item">HTML</li>
          <li className="list__item">CSS</li>
          <li className="list__item">JS</li>
          <li className="list__item">React</li>
          <li className="list__item">Git</li>
          <li className="list__item">Express.js</li>
          <li className="list__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
