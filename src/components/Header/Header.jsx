import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import SavedNews from '../SavedNews/SavedNews.jsx';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title">NewsExplorer</h1>
      <nav>
        <ul className="header__nav">
          <li className="header__nav-item">
            <a href="#" className="header__nav-link">
              Home
            </a>
          </li>
          <li className="header__nav-item">
            <a href="#" className="header__nav-link">
              About
            </a>
          </li>
          <li className="header__nav-item">
            <a href="#" className="header__nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
