import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import useScreenWidth from '../../utils/hooks/useScreenWidth';
import { MOBILE_MENU_WIDTH } from '../../constants/constants';
import './Header.css';

export default function Header({ OnSignInClick, hideMobileMenuButton, loggedIn }) {
  const screenWidth = useScreenWidth();
  const { pathname } = useLocation();
  const [selectedPage, setSelectedPage] = React.useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileType, setIsMobileType] = React.useState(false);
  const [itemsMobileColor, setItemsMobileColor] = React.useState('');
  const [mobileMenuButtonColor, setMobileMenuButtonColor] = React.useState('');
  const [isMobileMenuButtonVisible, setIsMobileMenuButtonVisible] = React.useState(false);
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
      default:
        break;
    }
  }, [pathname]);

  const handleSignInClick = () => {
    setIsMobileMenuOpen(false);
    OnSignInClick();
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

  const isMobileMenuButtonClass = isMobileMenuButtonVisible && !hideMobileMenuButton && 'header_mobile_visible';
  const headerMobileMenuClass = isMobileMenuOpen && 'header__title_menu_white';

  const handleItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${selectedPage}`}>
      <h1 className={`header__title ${headerMobileMenuClass}`}>NewsExplorer</h1>
      <button
        aria-label="Mobile Menu"
        type="button"
        className={`button header_type_mobile ${isMobileMenuButtonClass} ${
          isMobileMenuOpen ? 'button_type_close' : mobileMenuButtonColor
        }`}
        onClick={handleMenuClick}
      />
      <Navigation
        OnSignInClick={handleSignInClick}
        showMobileMenu={isMobileMenuOpen}
        isMobileType={isMobileType}
        itemsMobileColor={itemsMobileColor}
        onItemClick={handleItemClick}
        loggedIn={loggedIn}
      />
    </header>
  );
}
