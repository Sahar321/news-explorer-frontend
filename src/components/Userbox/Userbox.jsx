/*eslint-disable */
import React from 'react';
import './Userbox.css';

export default function Userbox({ username, avatar, children }) {

  return (
    <>
      <div className="userbox__warper">
        <div className="userbox__username">{username}</div>
        <div className="userbox__inner-box">
          <img className="userbox__avatar" src={avatar} alt="avatar" />
          {children}
        </div>
      </div>
    </>
  );
}
