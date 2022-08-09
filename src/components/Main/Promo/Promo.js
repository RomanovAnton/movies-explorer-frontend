import React from "react";
import promoImage from "../../../images/promo-image-min.svg";
import "./Promo.css";
import NavTab from "../NavTab/NavTab";

export default function Promo() {
  return (
    <section>
      <div className="promo">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__caption">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <img src={promoImage} alt="promoImage" className="promo__image" />
      </div>
      <NavTab />
    </section>
  );
}
