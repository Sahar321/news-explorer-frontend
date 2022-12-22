import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Navigation.css';

export default function Navigation({
  showMobileMenu,
  OnSignOutClick,
  OnSignInClick,
  isMobileType,
  onItemClick,
  loggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
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
          {loggedIn && currentUser && (<NavLink
              onClick={onItemClick}
              to="/SavedArticles"
              className={({ isActive }) => (isActive
                ? `navigation__link navigation__link_type_saved-articles ${showActiveStyle}`
                : 'navigation__link navigation__link_type_saved-articles')
              }
            >
              Saved articles
            </NavLink>) }
          </li>

          {loggedIn && currentUser ? (
            <li className="">
              <button
                aria-label="Sign Out"
                onClick={OnSignOutClick}
                className="button button_type_sign-out"
              >
                {currentUser.name} <i className="icon icon_type_sign-out"></i>
              </button>
            </li>
          ) : (
            <li>
              <button
                aria-label="Sign In"
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
