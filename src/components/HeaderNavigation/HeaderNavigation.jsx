/*eslint-disable*/
import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import AvatarWithMenu from '../AvatarWithMenu/AvatarWithMenu';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useAppStyles from '../../utils/hooks/useAppStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useClickOutside from '../../utils/hooks/useClickOutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faHouse,
} from '@fortawesome/free-solid-svg-icons';

import './HeaderNavigation.css';

export default function HeaderNavigation({
  onSignOut,
  onSignInClick,
  onItemClick,
  loggedIn,
}) {
  const isMobileScreen = useMediaQuery('(max-width: 590px)');
  const currentUser = useContext(CurrentUserContext);
  const { appMobileMenuStyle } = useAppStyles();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState();
  const handleMenuStateChange = (menuIsOpen) => {
    console.log('menuIsOpen', menuIsOpen);
    setIsMobileMenuOpen(menuIsOpen);
  };
  const headerNavigationRef = useRef();
  useClickOutside(headerNavigationRef, isMobileMenuOpen, () => {
    setIsMobileMenuOpen(false);
  });
  const handleOnSignOut = () => {
    setIsMobileMenuOpen(false);
    onSignOut();
  };
  const handleOnItemClick = () => {
    setIsMobileMenuOpen(false);
    onItemClick();
  };
  const renderLoginButton = () => {
    return loggedIn ? (
      <>
        <AvatarWithMenu
          data-name="header-menu"
          data-menu-type="desktop"
          onSignOut={onSignOut}
          avatar={currentUser?.avatar}
          name={currentUser?.name}
        />
        <BurgerMenu
          menuOpen={isMobileMenuOpen}
          onMenuStateChange={handleMenuStateChange}
          data-name="header-menu"
          data-menu-type="mobile"
        />
      </>
    ) : (
      <button
        aria-label="Sign In"
        onClick={onSignInClick}
        className="button button__sign-in"
      >
        Sign in
      </button>
    );
  };

  const handleActiveItem = ({ isActive }) => {
    if (isActive) {
      return isMobileMenuOpen
        ? 'header-navigation__item-link header-navigation__item-link_type_mobile activeMenuClass'
        : 'header-navigation__item-link header-navigation__item_type_active ';
    } else {
      return 'header-navigation__item-link';
    }
  };

  return (
    <>
      <nav
        ref={headerNavigationRef}
        className={`header-navigation ${
          isMobileMenuOpen &&
          `header-navigation_type_mobile ${appMobileMenuStyle}`
        } `}
      >
        <div
          className={`header-navigation__avatar ${
            isMobileMenuOpen && 'header-navigation__avatar_type_mobile'
          }`}
        >
          {renderLoginButton()}
        </div>
        <ul
          className={`header-navigation__list ${
            isMobileMenuOpen && 'header-navigation__list_type_mobile'
          }`}
        >
          <li className="header-navigation__item">
            <NavLink
              className={handleActiveItem}
              onClick={handleOnItemClick}
              to="/"
            >
              <FontAwesomeIcon icon={faHouse} style={{color: "#000000",}} />
              Home
            </NavLink>
          </li>
          <li className="header-navigation__item">
            <NavLink
              className={handleActiveItem}
              onClick={handleOnItemClick}
              to="/SavedArticles"
            >
              Saved articles
            </NavLink>
          </li>
          <li
            data-menu-type="mobile"
            className={`header-navigation__item ${
              isMobileMenuOpen && 'header-navigation__item_type_mobile'
            }`}
          >
            <SettingsIcon sx={{ width: '32px', height: 'auto' }} />
            <NavLink
              data-item="true"
              onClick={handleOnItemClick}
              className={handleActiveItem} /* "header-navigation__item-link" */
              to="/profile"
            >
              Profile
            </NavLink>
          </li>
          <li data-menu-type="mobile" className="header-navigation__item">
            <ExitToAppIcon sx={{ width: '32px', height: 'auto' }} />
            <button
              data-item="true"
              className="button header-navigation__button"
              onClick={handleOnSignOut}
            >
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
