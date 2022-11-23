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

  const handleSignInSubmit = (email, password) => {
    console.log(`Sign in with email: ${email} and password: ${password}`);
  };
  const handleSignUpSubmit = (email, password, username) => {
    console.log(`Sign up with email: ${email} and password: ${password} and username: ${username}`);
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
    </>
  );
}
