/* eslint react/prop-types: 0 */
import React from 'react';
import { NavLink } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';
// import SavedNews from '../SavedNews/SavedNews.jsx';
import './Header.css';
/* eslint react/prop-types: 0 */
/* eslint no-confusing-arrow: 0 */
/* eslint  implicit-arrow-linebreak : 0 */
/* className={({ isActive }) => (isActive ? 'header__nav-item' : 'header__nav-item')} */
export default function Header({ OnSignInClick }) {
  return (
    <header className="header">
      <h1 className="header__title">NewsExplorer</h1>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <NavLink to="/" className="header__nav-link">
              Home
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/SavedArticles" className="header__nav-link">
              Saved articles
            </NavLink>
          </li>
        </ul>
        <button onClick={OnSignInClick} className="button button__sign-in">
          Sign in
        </button>
      </nav>
    </header>
  );
}
