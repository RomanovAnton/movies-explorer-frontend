import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Popup from "../Popup/Popup";
import usePopup from "../../hooks/usePopup";
import { ProtectedRoute } from "../../components/ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";
import { mainApi } from "../../utils/MainApi";
import {
  SUCCSESS_REGISTER_TEXT,
  CONFLICT_ERROR_TEXT,
  CONFLICT_ERROR_CODE,
  UNAUTHORIZED_ERROR_TEXT,
  UNAUTHORIZED_ERROR_CODE,
  COMMON_ERROR_TEXT,
  SUCCSESS_UPDATE_PROFILE_TEXT,
} from "../../utils/constants/constants";
import "./App.css";

export default function App() {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [authError, setAuthError] = useState("");
  const popup = usePopup();

  const resetError = () => {
    setAuthError("");
  };

  useEffect(() => {
    getProfileData();
  }, [loggedIn]);

  const getProfileData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .checkToken()
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          mainApi.getSavedMovies().then((res) => {
            setSavedMovies(res);
          });
          navigate("/movies");
        })
        .catch((errCode) => console.log(errCode));
    }
  };

  const handleRegister = (data) => {
    mainApi
      .register(data)
      .then((res) => {
        popup.openPopup(SUCCSESS_REGISTER_TEXT);
        handleLogin({
          email: data.email,
          password: data.password,
        });
      })
      .catch((errCode) => {
        if (errCode === CONFLICT_ERROR_CODE) {
          setAuthError(CONFLICT_ERROR_TEXT);
        } else {
          setAuthError(COMMON_ERROR_TEXT);
        }
      });
  };

  const handleLogin = (data) => {
    mainApi
      .login(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((errCode) => {
        if (errCode === UNAUTHORIZED_ERROR_CODE) {
          setAuthError(UNAUTHORIZED_ERROR_TEXT);
        } else {
          popup.openPopup(COMMON_ERROR_TEXT);
        }
        setLoggedIn(false);
      });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

  const handleUpdateProfile = (data) => {
    mainApi
      .updateProfile(data)
      .then((res) => {
        setCurrentUser(res);
        popup.openPopup(SUCCSESS_UPDATE_PROFILE_TEXT);
      })
      .catch((errCode) => {
        if (errCode === CONFLICT_ERROR_CODE) {
          setAuthError(CONFLICT_ERROR_TEXT);
        } else {
          setAuthError(COMMON_ERROR_TEXT);
        }
      });
  };

  const handleSaveMovie = (data) => {
    mainApi.addSavedMovie(data).then((newSavedMovie) => {
      setSavedMovies([...savedMovies, newSavedMovie]);
    });
  };

  const handleDeleteMovie = (_id) => {
    mainApi
      .deleteSavedMovie(_id)
      .then(() => {
        setSavedMovies((prev) => prev.filter((item) => item._id !== _id));
      })
      .catch(() => popup.openPopup(COMMON_ERROR_TEXT));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SavedMoviesContext.Provider value={savedMovies}>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
            <Route
              path="/sign-up"
              element={
                <Register
                  onRegister={handleRegister}
                  authError={authError}
                  onResetError={resetError}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  onLogin={handleLogin}
                  authError={authError}
                  onResetError={resetError}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Movies
                    openPopup={popup.openPopup}
                    onSaveMovie={handleSaveMovie}
                    onDeleteMovie={handleDeleteMovie}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies
                    onDeleteMovie={handleDeleteMovie}
                    openPopup={popup.openPopup}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    onSignOut={signOut}
                    onUpdate={handleUpdateProfile}
                    authError={authError}
                    onResetError={resetError}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Popup
            isOpen={popup.popupIsOpen}
            message={popup.popupMessage}
            closePopup={popup.closePopup}
          />
        </div>
      </SavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}
