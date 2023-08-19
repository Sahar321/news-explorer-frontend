/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import useScreenWidth from '../../utils/hooks/useScreenWidth';
import { SCREEN_WIDTHS } from '../../constants/constants';

import './Header.css';

export default function Header({
  onSignInClick,
  onSignOutClick,
  hideMobileMenuButton,
  loggedIn,
}) {
  const screenWidth = useScreenWidth();
  const { pathname } = useLocation();
  const { MOBILE_MENU_WIDTH } = SCREEN_WIDTHS;
  const [selectedPage, setSelectedPage] = useState('');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileType, setIsMobileType] = useState(false);
  const [itemsMobileColor, setItemsMobileColor] = useState('');
  const [mobileMenuButtonColor, setMobileMenuButtonColor] = useState('');
  const [isMobileMenuButtonVisible, setIsMobileMenuButtonVisible] =
    useState(false);
  useEffect(() => {
    switch (pathname) {
      case '/':
        setSelectedPage('header_page_home');
        setMobileMenuButtonColor('header_mobile_white');
        break;
      case '/SavedArticles':
        setMobileMenuButtonColor('header_mobile_black');
        setSelectedPage('header_page_saved-articles');
        setItemsMobileColor('navigation__items_color_white');
        break;
      case '/profile':
        setMobileMenuButtonColor('header_mobile_black');
        setSelectedPage('header_page_saved-articles');
        setItemsMobileColor('navigation__items_color_white');
        break;
      default:
        break;
    }
  }, [pathname]);

  const handleSignInClick = () => {
    setIsMobileMenuOpen(false);
    onSignInClick();
  };

  useEffect(() => {
    if (screenWidth > MOBILE_MENU_WIDTH) {
      setIsMobileMenuButtonVisible(false);
      setIsMobileType(false);
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsMobileType(true);
      setIsMobileMenuButtonVisible(true);
    }
  }, [screenWidth]);

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isMobileMenuButtonClass =
    isMobileMenuButtonVisible &&
    !hideMobileMenuButton &&
    'header_mobile_visible';
  const headerMobileMenuClass = isMobileMenuOpen && 'header__title_menu_white';

  const handleItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${selectedPage}`}>
      <span className={`header__title ${headerMobileMenuClass}`}>
        NewsExplorer
      </span>
      <button
        aria-label="Mobile Menu"
        type="button"
        className={`button header_type_mobile ${isMobileMenuButtonClass} ${
          isMobileMenuOpen ? 'button_type_close' : mobileMenuButtonColor
        }`}
        onClick={handleMenuClick}
      />
      <Navigation
        onSignInClick={handleSignInClick}
        onSignOutClick={onSignOutClick}
        showMobileMenu={isMobileMenuOpen}
        isMobileType={isMobileType}
        itemsMobileColor={itemsMobileColor}
        onItemClick={handleItemClick}
        loggedIn={loggedIn}
      />
    </header>
  );
}
