import React, { useRef, useState, useEffect } from 'react';
import useAppStyles from '../../utils/hooks/useAppStyles';
import './BurgerMenu.css';

export default function BurgerMenu({
  onMenuStateChange,
  'data-name': dataName,
  'data-menu-type': dataMenuType,
  menuOpen,
}) {
  const { appMenuStyle } = useAppStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);
  useEffect(() => {
    setIsMenuOpen(menuOpen);
  }, [menuOpen]);

  const menuRef = useRef(null);
  useEffect(() => {
    console.log('useEffectMenuOpen', isMenuOpen);
    onMenuStateChange(isMenuOpen);
  }, [isMenuOpen]);

  const toggleMenuVisibility = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      ref={menuRef}
      data-menu-type={dataMenuType}
      data-name={dataName}
      onClick={toggleMenuVisibility}
      className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
    >
      <span className={`burger-menu__line  ${appMenuStyle}`}></span>
      <span className={`burger-menu__line  ${appMenuStyle}`}></span>
      <span className={`burger-menu__line  ${appMenuStyle}`}></span>
      <span className={`burger-menu__line  ${appMenuStyle}`}></span>
    </div>
  );
}
