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
import { ProtectedRoute } from "../../components/ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";
import {
  register,
  login,
  checkToken,
  updateProfile,
  addSavedMovie,
  getSavedMovies,
  deleteSavedMovie,
} from "../../utils/MainApi";
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
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [authError, setAuthError] = useState("");

  const resetError = () => {
    setAuthError("");
  };

  useEffect(() => {
    getProfileData();
  }, [loggedIn]);

  const getProfileData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          getSavedMovies()
            .then((res) => {
              setSavedMovies(res);
            })
            .catch(() => console.log("Сохраненных фильмов пока нет")); // будет ли прилетать в catch если список пуст
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
        handleLogin(data);
        // setTimeout(closePopup, 1000);
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
          setAuthError(UNAUTHORIZED_ERROR_TEXT);
        } else {
          openPopup(COMMON_ERROR_TEXT);
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
    updateProfile(data)
      .then((res) => {
        setCurrentUser(res);
        openPopup(SUCCSESS_UPDATE_PROFILE_TEXT);
      })
      .catch(() => {
        setAuthError(COMMON_ERROR_TEXT);
      });
  };

  const handleSaveMovie = (data) => {
    addSavedMovie(data).then((newSavedMovie) => {
      setSavedMovies([...savedMovies, newSavedMovie]);
    });
  };

  const handleDeleteMovie = (_id) => {
    deleteSavedMovie(_id)
      .then(() => {
        setSavedMovies((prev) => prev.filter((item) => item._id !== _id));
      })
      .catch(() => openPopup(COMMON_ERROR_TEXT));
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
                    openPopup={openPopup}
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
                    openPopup={openPopup}
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
            isOpen={popupIsOpen}
            message={popupMessage}
            closePopup={closePopup}
          />
        </div>
      </SavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}
