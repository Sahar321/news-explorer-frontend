/* eslint react/prop-types: 0 */
/* eslint no-unused-vars: 0 */
/* eslint operator-linebreak: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-confusing-arrow: 0 */
/* eslint  implicit-arrow-linebreak : 0 */
import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import useScreenWidth from '../../utils/hooks/useScreenWidth';
import './Header.css';

export default function Header({
  OnSignInClick,
  OnSignOutClick,
  loggedIn,
  navMenuIsOpen,
}) {
  const mobileWidth = 590; // need to move to constants
  const [selectedPage, setSelectedPage] = React.useState('');
  const { pathname } = useLocation();
  const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(false);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (pathname === '/') setSelectedPage('header_page_home');
    if (pathname === '/SavedArticles') {
      setSelectedPage('header_page_saved-articles');
    }
  }, [pathname]);

  useEffect(() => {
    if (screenWidth > mobileWidth) {
      setIsNavMenuOpen(false);
    }
    console.log('screenWidth', screenWidth);
  }, [screenWidth]);
  const handleMenuClick = (e) => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };
  const menuClass = isNavMenuOpen ? 'header__title_menu_white' : '';
  return (
    <header className={`header ${selectedPage}`}>
      <h1 className={`header__title ${menuClass}`}>NewsExplorer</h1>
      <button
        type="button"
        className="button header__nav_type_mobile"
        onClick={handleMenuClick}
      />
      <Navigation showNav={isNavMenuOpen} />
    </header>
  );
}
