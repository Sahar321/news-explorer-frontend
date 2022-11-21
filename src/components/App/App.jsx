/* eslint no-unused-vars: 0 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import SavedNews from '../SavedNews/SavedNews.jsx';

import Home from '../../pages/Home.jsx';
import SavedArticles from '../../pages/SavedArticles.jsx';
import NotFound from '../../pages/NotFound.jsx';
import SignInPopup from '../SignInPopup/SignInPopup.jsx';
import SignUpPopup from '../SignUpPopup/SignUpPopup.jsx';
import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isSignInPopupOpen, setSignInPopupOpen] = React.useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = React.useState(false);

  const closeAllPopups = () => {
    setSignUpPopupOpen(false);
    setSignInPopupOpen(false);
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
    <>
      <Routes>
        <Route path="/" element={<Home OnSignInClick={handleSignInClick} />} />
        <Route path="/SavedArticles" element={<SavedArticles />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SignInPopup
        onClose={closeAllPopups}
        title='Sign In'
        isOpen={isSignInPopupOpen}
        onSignUpPopupClick={handleSignUpClick}
      />
      <SignUpPopup
        onClose={closeAllPopups}
        title='Sign Up'
        isOpen={isSignUpPopupOpen}
        onSignInPopupClick={handleSignInClick}
      />
    </>
  );
}
