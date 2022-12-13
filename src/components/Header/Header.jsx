/* eslint react/prop-types: 0 */
/* eslint no-unused-vars: 0 */
/* eslint operator-linebreak: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-confusing-arrow: 0 */
/* eslint  implicit-arrow-linebreak : 0 */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import useScreenWidth from '../../utils/hooks/useScreenWidth';
import { MOBILE_MENU_WIDTH } from '../../constants/constants';
import './Header.css';

export default function Header({ OnSignInClick, hideMobileMenuButton }) {
  const screenWidth = useScreenWidth();
  const { pathname } = useLocation();
  const [selectedPage, setSelectedPage] = React.useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileType, setIsMobileType] = React.useState(false);
  const [itemsMobileColor, setItemsMobileColor] = React.useState('');
  const [mobileMenuButtonColor, setMobileMenuButtonColor] = React.useState('');
  const [isMobileMenuButtonVisible, setIsMobileMenuButtonVisible] =
    React.useState(false);
  useEffect(() => {
    switch (pathname) {
      case '/':
        setSelectedPage('header_page_home');
        setMobileMenuButtonColor('header__nav_mobile_white');
        break;
      case '/SavedArticles':
        setMobileMenuButtonColor('header__nav_mobile_black');
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

  const handleMenuClick = (e) => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isMobileMenuButtonClass =
    isMobileMenuButtonVisible && !hideMobileMenuButton && 'header__nav_type_mobile_visible';
  const headerMobileMenuClass = isMobileMenuOpen && 'header__title_menu_white';

  const handleItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${selectedPage}`}>
      <h1 className={`header__title ${headerMobileMenuClass}`}>NewsExplorer</h1>
      <button
        type="button"
        className={`button header__nav_type_mobile ${isMobileMenuButtonClass} ${
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
      />
    </header>
  );
}
