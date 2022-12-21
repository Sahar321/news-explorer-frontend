/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProtectedRoutes from '../../utils/ProtectedRoutes.jsx';
import Home from '../../pages/Home.jsx';
import SavedArticles from '../../pages/SavedArticles.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import SignInPopup from '../SignInPopup/SignInPopup.jsx';
import SignUpPopup from '../SignUpPopup/SignUpPopup.jsx';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage.jsx';
import mainApi from '../../utils/MainApi.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignInPopupOpen, setSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = useState(false);
  const [popupWithMessage, setPopupWithMessage] = useState({
    isOpen: false,
    title: '',
  });
  const [hideMobileMenuButton, setHideMobileMenuButton] = React.useState(false);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    if (token) {
      mainApi
        .getUserInfo(token)
        .then((res) => {
          if (res._id) {
            setCurrentUser(res);
            setLoggedIn(true);
          }
        })
        .catch(({ message }) => {
          console.log('getUserInfo', message);
        });
    }
  }, [token]);

  useEffect(() => {
    if (isSignInPopupOpen || isSignUpPopupOpen || popupWithMessage.isOpen) {
      setHideMobileMenuButton(true);
    }
  }, [isSignInPopupOpen, isSignUpPopupOpen, popupWithMessage]);

  const closeAllPopups = () => {
    setSignUpPopupOpen(false);
    setSignInPopupOpen(false);
    setPopupWithMessage({ isOpen: false, title: '' });
    setHideMobileMenuButton(false);
  };

  const handleSignInClick = () => {
    closeAllPopups();
    setSignInPopupOpen(true);
  };

  const handleSignUpClick = () => {
    closeAllPopups();
    setSignUpPopupOpen(true);
  };

  const handleSignInSubmit = (data) => {
    mainApi
      .signin(data)
      .then((res) => {
        if (res.token) {
          closeAllPopups();
          localStorage.setItem('jwt', res.token);
          console.log('Login Success!', res);
        }
      })
      .catch(({ message }) => {
        console.log('handleSignInSubmit', message);
      });
  };
  const handleSignUpSubmit = (data) => {
    mainApi
      .signup(data)
      .then((res) => {
        if (res._id) {
          closeAllPopups();
          console.log('Register Success!', res);
        }
      })
      .catch(({ message }) => {
        console.log('handleSignUpSubmit', message);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          loggedIn={false}
          OnSignInClick={handleSignInClick}
          OnSignUpClick={handleSignUpClick}
          hideMobileMenuButton={hideMobileMenuButton}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/SavedArticles" element={<SavedArticles />} />
          </Route>
        </Routes>
        <Footer />
        <SignInPopup
          onClose={closeAllPopups}
          title="Sign In"
          isOpen={isSignInPopupOpen}
          onSubmit={handleSignInSubmit}
          onSignUpPopupClick={handleSignUpClick}
        />
        <SignUpPopup
          onClose={closeAllPopups}
          onSubmit={handleSignUpSubmit}
          title="Sign Up"
          isOpen={isSignUpPopupOpen}
          onSignInPopupClick={handleSignInClick}
        />
        <PopupWithMessage
          title={popupWithMessage.title}
          onClose={closeAllPopups}
          isOpen={popupWithMessage.isOpen}
        >
          <Link
            onClick={handleSignInClick}
            className="popup__link popup__link_type_message"
          >
            Sign in
          </Link>
        </PopupWithMessage>
      </div>
    </CurrentUserContext.Provider>
  );
}
