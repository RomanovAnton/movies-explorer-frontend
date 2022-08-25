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
import { register, login, checkToken } from "../../utils/MainApi";
import {
  SUCCSESS_REGISTER_TEXT,
  CONFLICT_ERROR_TEXT,
  CONFLICT_ERROR_CODE,
  UNAUTHORIZED_ERROR_TEXT,
  UNAUTHORIZED_ERROR_CODE,
  COMMON_ERROR_TEXT,
} from "../../utils/constants/constants";

import "./App.css";
import { useEffect } from "react";

export default function App() {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          // setProfileData
          // setSavedMovies
          navigate("/movies");
        })
        .catch((errCode) => console.log(errCode));
    }
  };

  const closePopup = () => {
    setPopupIsOpen(false);
    setPopupMessage("");
  };

  const openPopup = (message) => {
    setPopupMessage(message);
    setPopupIsOpen(true);
  };

  const handleRegister = async (data) => {
    await register(data)
      .then((res) => {
        openPopup(SUCCSESS_REGISTER_TEXT);
        // setTimeout(closePopup, 1000);
      })
      .catch((errCode) => {
        if (errCode === CONFLICT_ERROR_CODE) {
          openPopup(CONFLICT_ERROR_TEXT);
        } else {
          openPopup(COMMON_ERROR_TEXT);
        }
      });

    handleLogin(data);
  };

  const handleLogin = (data) => {
    login(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((errCode) => {
        if (errCode === UNAUTHORIZED_ERROR_CODE) {
          openPopup(UNAUTHORIZED_ERROR_TEXT);
        } else {
          openPopup(COMMON_ERROR_TEXT);
        }
        setLoggedIn(false);
      });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    //useData -> 0
    navigate("./sign-in");
  };

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
        <Route
          path="/movies"
          element={<Movies openPopup={openPopup} closePopup={closePopup} />}
        />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route
          path="/sign-up"
          element={<Register onRegister={handleRegister} />}
        />
        <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        <Route path="/profile" element={<Profile onSignOut={signOut} />} />
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
