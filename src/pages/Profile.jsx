/*eslint-disable */
import React, { useEffect, useContext, useState } from 'react';
import NewsCardList from '../components/NewsCardList/NewsCardList.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditIcon from '@mui/icons-material/Edit';
import './Profile.css';

export default function Profile({ setAppStyles, onAvatarClick }) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setAppStyles('app_page_saved-articles');
    return () => {
      setAppStyles('');
    };
  }, []);

  return (
    <>
      <section className="profile">
        <h2 className="profile__title">Profile</h2>
        <div className="profile__info-warper">
          <img
            src={currentUser.avatar}
            alt="avatar"
            className="profile__avatar"
            onClick={onAvatarClick}
          />
          <p className="profile__info-title">
            username:{' '}
            <span className="profile__info-text">{currentUser.name}</span>
          </p>
          <p className="profile__info-title">
            email:
            <span className="profile__info-text">{currentUser.email}</span>
          </p>
        </div>
      </section>
    </>
  );
}
