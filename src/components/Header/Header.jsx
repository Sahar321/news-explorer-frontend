/* eslint react/prop-types: 0 */
/* eslint no-unused-vars: 0 */
/* eslint operator-linebreak: 0 */

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import signOutImage from '../../images/icons/sign-out.svg';
// import { Routes, Route } from 'react-router-dom';
// import SavedNews from '../SavedNews/SavedNews.jsx';
import './Header.css';
/* eslint react/prop-types: 0 */
/* eslint no-confusing-arrow: 0 */
/* eslint  implicit-arrow-linebreak : 0 */
/* className={({ isActive }) => (isActive ? 'header__nav-link' : 'header__nav-link')} */
export default function Header({ OnSignInClick, OnSignOutClick, loggedIn }) {
  const defaultClass = 'header__nav-link';
  const activeClass = 'header__nav-link header__nav-link_isActive_true';
  const { pathname } = useLocation();
  const savedArticlesClass =
    pathname === '/SavedArticles' && 'header_page_saved-articles';

  return (
    <header className={`header ${savedArticlesClass}`}>
      <h1 className="header__title">NewsExplorer</h1>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : defaultClass
              }
            >
              Home
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink
              to="/SavedArticles"
              className={({ isActive }) =>
                isActive ? activeClass : defaultClass
              }
            >
              Saved articles
            </NavLink>
          </li>
        </ul>
        {loggedIn ? (
          <button
            onClick={OnSignOutClick}
            className="button button_type_sign-out"
          >
            elise <img alt="Sign out" src={signOutImage} />
          </button>
        ) : (
          <button onClick={OnSignInClick} className="button button__sign-in">
            Sign in
          </button>
        )}
      </nav>
    </header>
  );
}
