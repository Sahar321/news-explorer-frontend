/*eslint-disable*/
import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import useClickOutside from '../../utils/hooks/useClickOutside';
import useImage from '../../utils/hooks/useImage';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Preloader from '../Preloader/Preloader';
import './AvatarWithMenu.css';
import { set } from 'animejs';

export default function AvatarWithMenu({ avatar, name, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const ImageLoadingStatus = Object.freeze({
    PENDING: 'PENDING',
    LOADED: 'LOADED',
    ERROR: 'ERROR',
  });

  const [avatarLoadStatus, setAvatarLoadStatus] = React.useState(
    ImageLoadingStatus.PENDING
  );

  const menuRef = React.useRef(null);
  useEffect(() => {
    setAvatarLoadStatus(ImageLoadingStatus.PENDING);
  }, [avatar]);
  useClickOutside(menuRef, () => {
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

  const handleAvatarError = () => {
    setAvatarLoadStatus(ImageLoadingStatus.ERROR);
  };
  const handleAvatarLoad = () => {
    setAvatarLoadStatus(ImageLoadingStatus.LOADED);
  };

  const result = useImage(
    avatar,
    'https://fastly.picsum.photos/id/82/200/300.jpg?hmac=hfuNcoCWsYuVOmlcRdKAieM4Ax03DjM-mpVlqRUdGfc'
  );

  return (
    <div ref={menuRef} className={`avatar-menu ${isMenuOpen && 'isOpen'}`}>
      {/*    {avatarLoadStatus === ImageLoadingStatus.ERROR ? (
        <AccountCircleIcon
          sx={{
            borderRadius: '50%',
            height: '50px',
            width: '50px',
            cursor: 'pointer',
          }}
          onClick={toggleMenuVisibility}
        />
      ) : (
        <img
          onError={handleAvatarError}
          onLoad={handleAvatarLoad}
          className="avatar-menu__avatar"
          src={avatar}
          onClick={toggleMenuVisibility}
        />
      )} */}
      <img
        onError={handleAvatarError}
        onLoad={handleAvatarLoad}
        className="avatar-menu__avatar"
        src={result}
        onClick={toggleMenuVisibility}
      />

      {isMenuOpen && (
        <nav className={`avatar-menu__menu ${isMenuOpen && 'isOpen'}`}>
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
      )}
    </div>
  );
}
