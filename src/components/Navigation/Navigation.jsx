import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({
  showMobileMenu,
  OnSignOutClick,
  OnSignInClick,
  isMobileType,
  onItemClick,
}) {
  const loggedIn = false;

  const showActiveStyle = !isMobileType && 'navigation__link_isActive_true'; // don't show active style on mobile
  const showMobileMenuClass = showMobileMenu && 'navigation_mobile_show'; // show mobile menu on button click

  const navigationType = isMobileType
    ? 'navigation_type_mobile'
    : 'navigation_type_desktop';

  return (
    <>
      <nav className={`navigation ${navigationType} ${showMobileMenuClass}`}>
        <ul className="navigation__items">
          <li>
            <NavLink
              onClick={onItemClick}
              to="/"
              className={({ isActive }) => (isActive
                ? `navigation__link navigation__link_type_home ${showActiveStyle}`
                : 'navigation__link navigation__link_type_home')
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={onItemClick}
              to="/SavedArticles"
              className={({ isActive }) => (isActive
                ? `navigation__link navigation__link_type_saved-articles ${showActiveStyle}`
                : 'navigation__link navigation__link_type_saved-articles')
              }
            >
              Saved articles
            </NavLink>
          </li>

          {loggedIn ? (
            <li className="">
              <button
                onClick={OnSignOutClick}
                className="button button_type_sign-out"
              >
                elise <i className="icon icon_type_sign-out"></i>
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={OnSignInClick}
                className="button button__sign-in"
              >
                Sign in
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
