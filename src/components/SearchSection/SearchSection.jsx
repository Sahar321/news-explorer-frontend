import React from 'react';
import './SearchSection.css';

export default function SearchSection({ children, title, text }) {
  return (
    <div className="search-section">
      <h1 className="search-section__title">{title}</h1>
      <p className="search-section__text">{text}</p>
      {children}
    </div>
  );
}
