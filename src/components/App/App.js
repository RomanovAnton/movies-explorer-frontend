import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Popup from "../Popup/Popup";
import { register } from "../../utils/MainApi";
import {
  SUCCSESS_REGISTER_TEXT,
  CONFLICT_ERROR_TEXT,
  CONFLICT_ERROR_CODE,
  COMMON_ERROR_TEXT,
} from "../../utils/constants/constants";

import "./App.css";

export default function App() {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
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

  const handleRegister = (data) => {
    register(data)
      .then((res) => {
        openPopup(SUCCSESS_REGISTER_TEXT);
        navigate("/sign-in");
      })
      .catch((errCode) => {
        if (errCode === CONFLICT_ERROR_CODE) {
          openPopup(CONFLICT_ERROR_TEXT);
        } else {
          openPopup(COMMON_ERROR_TEXT);
        }
      });
  };

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route
          path="/movies"
          element={<Movies openPopup={openPopup} closePopup={closePopup} />}
        />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route
          path="/sign-up"
          element={<Register handleRegister={handleRegister} />}
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Popup
        isOpen={popupIsOpen}
        message={popupMessage}
        closePopup={closePopup}
      />
    </div>
  );
}
