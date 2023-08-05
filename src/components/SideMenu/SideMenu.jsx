/*eslint-disable*/
import React from 'react';
import './SideMenu.css';

const SideMenu = () => {

  return (
    <nav className="menu-nav">
      <ul>
        <li>
          <a href="#">profile</a>
        </li>
        <li>
          <a href="#">My Post</a>
        </li>
        <li>
          <a href="#">My reaction</a>
        </li>

      </ul>
    </nav>
  );
};

export default SideMenu;
