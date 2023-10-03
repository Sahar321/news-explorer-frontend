/*eslint-disable*/
import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import useClickOutside from '../../utils/hooks/useClickOutside';
import useImage from '../../utils/hooks/useImage';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import avatarPlaceholderIcon from '../../images/icons/avatar.svg';
import './AvatarWithMenu.css';

export default function AvatarWithMenu({
  avatar,
  name,
  onSignOut,
  className,
  'data-menu-type': dataMenuType,
  'data-name': dataName,
}) {
  const userAvatar = useImage(avatar, avatarPlaceholderIcon);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = useRef(null);


  useClickOutside(menuRef, isMenuOpen, () => {
    setIsMenuOpen(false);
  });
  const toggleMenuVisibility = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleItemClick = ({ target }) => {
    const isItem = target.closest('[data-item="true"]');
    if (isItem) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      data-name={dataName}
      data-menu-type={dataMenuType}
      ref={menuRef}
      className={`avatar-menu ${className}`}
    >
      <img
        className="avatar-menu__avatar"
        src={userAvatar}
        onClick={toggleMenuVisibility}
      />

      <nav className={`avatar-menu__menu ${isMenuOpen && 'open'} `}>
        <ul className="avatar-menu__list" onClick={handleItemClick}>
          <li className="avatar-menu__header-container">
            <h2 data-item="false" className="avatar-menu__header">
              {name}
            </h2>
            <Divider sx={{ marginBottom: '5px' }} />
          </li>
          <li className="avatar-menu__item">
            <NavLink
              data-item="true"
              className="avatar-menu__link"
              to="/profile"
            >
              <SettingsIcon />
              Profile
            </NavLink>
          </li>
          <li className="avatar-menu__item">
            <button
              data-item="true"
              className="button avatar-menu__button"
              onClick={onSignOut}
            >
              <ExitToAppIcon />
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
