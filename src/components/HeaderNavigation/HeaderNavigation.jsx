/*eslint-disable*/
import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import AvatarWithMenu from '../AvatarWithMenu/AvatarWithMenu';
import SettingsIcon from '@mui/icons-material/Settings';
import './HeaderNavigation.css';

export default function HeaderNavigation({
  showMobileMenu,
  onSignOut,
  onSignInClick,
  isMobileType,
  onItemClick,
  loggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const renderLoginButton = () => {
    return loggedIn ? (
      <AvatarWithMenu
        onSignOut={onSignOut}
        avatar={currentUser?.avatar}
        name={currentUser?.name}
      />
    ) : (
      /*       <button
        aria-label="Sign Out"
        onClick={onSignOutClick}
        className="button button_type_sign-out"
      >
        {currentUser?.name} <i className="icon icon_type_sign-out"></i>
      </button> */
      <button
        aria-label="Sign In"
        onClick={onSignInClick}
        className="button button__sign-in"
      >
        Sign in
      </button>
    );
  };

  const handleActiveItem = ({ isActive }) =>
    isActive
      ? 'header-navigation__item-link header-navigation__item_type_active'
      : 'header-navigation__item-link';

  return (
    <>
      <nav className="header-navigation">
        <ul className="header-navigation__list">
          <li className="header-navigation__item">
            <NavLink className={handleActiveItem} onClick={onItemClick} to="/">
              Home
            </NavLink>
          </li>
          <li className="header-navigation__item">
            <NavLink
              className={handleActiveItem}
              onClick={onItemClick}
              to="/SavedArticles"
            >
              Saved articles
            </NavLink>
          </li>
          <li className="header-navigation__avatar">
            {renderLoginButton()}
          </li>
        </ul>
      </nav>
    </>
  );
}
