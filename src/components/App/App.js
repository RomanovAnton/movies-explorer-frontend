import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Popup from "../Popup/Popup";

import "./App.css";

export default function App() {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const closePopup = () => {
    setPopupIsOpen(false);
    setPopupMessage("");
  };

  const openPopup = (message) => {
    setPopupMessage(message);
    setPopupIsOpen(true);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route
            path="/movies"
            element={<Movies openPopup={openPopup} closePopup={closePopup} />}
          />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Popup isOpen={popupIsOpen} message={popupMessage} closePopup={closePopup} />
      </div>
    </BrowserRouter>
  );
}
