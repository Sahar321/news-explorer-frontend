/* eslint react/prop-types: 0 */
/* eslint no-unused-vars: 0 */
/* eslint operator-linebreak: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-confusing-arrow: 0 */
/* eslint  implicit-arrow-linebreak : 0 */
import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header({ OnSignInClick, OnSignOutClick, loggedIn }) {
  const [selectedPage, setSelectedPage] = React.useState('');
  const defaultClass = 'header__nav-link';
  const activeClass = 'header__nav-link header__nav-link_isActive_true';
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') setSelectedPage('header_page_home');
    if (pathname === '/SavedArticles') {
      setSelectedPage('header_page_saved-articles');
    }
  }, [pathname]);

  return (
    <header className={`header ${selectedPage}`}>
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
            elise <i className="icon icon_type_sign-out"></i>
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
