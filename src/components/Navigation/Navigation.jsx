/* eslint react/prop-types: 0 */
/* eslint no-unused-vars: 0 */
/* eslint operator-linebreak: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-confusing-arrow: 0 */
/* eslint  implicit-arrow-linebreak : 0 */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({ showNav }) {
  const refMenu = React.useRef();

  const loggedIn = true;
  const OnSignOutClick = () => {};
  const OnSignInClick = () => {};
  const showActiveStyle = showNav ? '' : 'navigation__link_isActive_true';

  return (
    <>
      <nav ref={refMenu} className={`navigation navMenu_isOpen_${showNav}`}>
        <ul className="navigation__items">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `navigation__link navigation__link_type_home ${showActiveStyle}`
                  : 'navigation__link navigation__link_type_home'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/SavedArticles"
              className={({ isActive }) =>
                isActive
                  ? `navigation__link navigation__link_type_saved-articles ${showActiveStyle}`
                  : 'navigation__link navigation__link_type_saved-articles'
              }
            >
              Saved articles
            </NavLink>
          </li>

          {loggedIn ? (
            <li className="">
              <button
                onClick={OnSignOutClick}
                className="button button_type_sign-out type_mobi"
              >
                elise <i className="icon icon_type_sign-out"></i>
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={OnSignInClick}
                className="button button__sign-in type_mobi"
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
