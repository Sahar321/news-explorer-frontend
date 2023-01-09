import React from 'react';
import Preloader from '../Preloader/Preloader.jsx';
import './SearchPreloader.css';

export default function SearchPreloader({ isVisible }) {
  return (
    <>
      {isVisible && (
        <div className="search-loading">
          <Preloader isVisible={isVisible} className="search-loading__icon" />
          <span className="search-loading__text">Searching for news...</span>
        </div>
      )}
    </>
  );
}
