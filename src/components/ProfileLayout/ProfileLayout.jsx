/*eslint-disable*/
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import React, { useEffect, useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import CommentsList from '../CommentsList.jsx';

import Profile from '../../pages/Profile.jsx';
import { NavLink } from 'react-router-dom';
import './ProfileLayout.css';
const ProfileLayout = ({
  handleAvatarClick,
  setAppStyles,
  onProfileEditClick,
  onProfileCommentClick,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const handleLinkIsActive = ({ isActive }) =>
    isActive ? 'menu__item-link active-link' : 'menu__item-link';


  return (
    <main className="pageS">
      <nav className="menu">
        <ul className="menu__warper">
          <li className="menu__item">
            <NavLink end className={handleLinkIsActive} to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              onClick={onProfileCommentClick}
              end
              className={handleLinkIsActive}
              to="/profile/comments"
            >
              Comments
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink end to="/profile/reactions" className={handleLinkIsActive}>
              Reactions
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Profile
              onProfileEditClick={onProfileEditClick}
              onAvatarClick={handleAvatarClick}
              setAppStyles={setAppStyles}
              currentUser={currentUser}
            />
          }
        />

        <Route path="comments" element={<CommentsList comments={currentUser?.comments} />} />
        <Route
          path="reactions"
          element={<h1 className="profile">reaction</h1>}
        />
      </Routes>
    </main>
  );
};

export default ProfileLayout;
