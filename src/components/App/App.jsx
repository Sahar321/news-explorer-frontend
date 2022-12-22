/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
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
import LoginState from '../../constants/enums/LoginState';
import './App.css';
import loginState from '../../constants/enums/LoginState';
import PagePreloader from '../../components/PagePreloader/PagePreloader.jsx';
export default function App() {
  const [loggedIn, setLoggedIn] = useState(LoginState.PENDING);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignInPopupOpen, setSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = useState(false);
  const [popupWithMessage, setPopupWithMessage] = useState({
    isOpen: false,
    title: '',
  });
  const [hideMobileMenuButton, setHideMobileMenuButton] = useState(false);
  const token = localStorage.getItem('jwt');
  let location = useLocation();

  React.useEffect(() => {
    const { shouldOpenSignInPopup } = location.state || false;
    if (shouldOpenSignInPopup) {
      setSignUpPopupOpen(true);
    }

    window.history.replaceState({}, document.title);
  }, [location]);

  useEffect(() => {
    if (token) {
      mainApi
        .getUserInfo(token)
        .then((res) => {
          if (res._id) {
            setCurrentUser(res);
            setLoggedIn(LoginState.LOGGED_IN);
          }
        })
        .catch(({ message }) => {
          console.log('getUserInfo', message);
        });
    } else {
      setLoggedIn(LoginState.LOGGED_OUT);
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
          setLoggedIn(loginState.LOGGED_IN);
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

  const handleSignOutClick = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setLoggedIn(loginState.LOGGED_OUT);
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          OnSignOutClick={handleSignOutClick}
          OnSignInClick={handleSignInClick}
          OnSignUpClick={handleSignUpClick}
          loggedIn={loggedIn}
          hideMobileMenuButton={hideMobileMenuButton}
        />
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
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
