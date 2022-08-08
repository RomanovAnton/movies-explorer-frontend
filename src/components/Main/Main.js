import React from "react";
import Header from "../Header/Header";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import "./Main.css";

export default function Main() {
  return (
    <div className="content">
      <Header />
      {/* <main> */}
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      {/* </main> */}
      <Footer />
    </div>
  );
}

// import NavTab from "../NavTab/NavTab";
// <NavTab />