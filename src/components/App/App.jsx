import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import SavedNews from '../SavedNews/SavedNews.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

import Home from '../../pages/Home.jsx';
import SavedArticles from '../../pages/SavedArticles.jsx';
import NotFound from '../../pages/NotFound.jsx';
import SignInPopup from '../SignInPopup/SignInPopup.jsx';
import SignUpPopup from '../SignUpPopup/SignUpPopup.jsx';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage.jsx';
import './App.css';

export default function App() {
  const [isSignInPopupOpen, setSignInPopupOpen] = React.useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = React.useState(false);
  const [isPopupWithMessageOpen, setPopupWithMessageOpen] = React.useState(false);
  const [hideMobileMenuButton, setHideMobileMenuButton] = React.useState(false);

  useEffect(() => {
    if (isSignInPopupOpen || isSignUpPopupOpen || isPopupWithMessageOpen) {
      setHideMobileMenuButton(true);
    }
  }, [isSignInPopupOpen, isSignUpPopupOpen, isPopupWithMessageOpen]);

  const closeAllPopups = () => {
    setSignUpPopupOpen(false);
    setSignInPopupOpen(false);
    setPopupWithMessageOpen(false);
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

  return (
    <div className="app">
      <Header
        loggedIn={false}
        OnSignInClick={handleSignInClick}
        OnSignUpClick={handleSignUpClick}
        hideMobileMenuButton={hideMobileMenuButton}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SavedArticles" element={<SavedArticles />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <SignInPopup
        onClose={closeAllPopups}
        title="Sign In"
        isOpen={isSignInPopupOpen}
        /*   onSubmit={handleSignInSubmit} */
        onSignUpPopupClick={handleSignUpClick}
      />
      <SignUpPopup
        onClose={closeAllPopups}
        /*   onSubmit={handleSignUpSubmit} */
        title="Sign Up"
        isOpen={isSignUpPopupOpen}
        onSignInPopupClick={handleSignInClick}
      />
      <PopupWithMessage
        title="Registration successfully completed!"
        onClose={closeAllPopups}
        isOpen={isPopupWithMessageOpen}
      >
        <Link
          onClick={handleSignInClick}
          className="popup__link popup__link_type_message"
        >
          Sign in
        </Link>
      </PopupWithMessage>
    </div>
  );
}
