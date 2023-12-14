/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation.jsx';
import useScreenWidth from '../../utils/hooks/useScreenWidth';
import { SCREEN_WIDTHS } from '../../constants/constants';

import './Header.css';

export default function Header({
  onSignInClick,
  onSignOut,
  hideMobileMenuButton,
  loggedIn,
  className,
}) {
  const handleItemClick = () => {console.log('handleItemClick');};
  return (
    <header className={`header ${className}`}>
      <span className={`header__title `}>NewsExplorer</span>

      <HeaderNavigation
        onSignInClick={onSignInClick}
        onSignOut={onSignOut}
        loggedIn={loggedIn}
        onItemClick={handleItemClick}
      />
    </header>
  );
}
