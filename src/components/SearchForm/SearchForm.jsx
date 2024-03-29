import React, { useState } from 'react';
import './SearchForm.css';

export default function SearchForm({ onSearchSubmit }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(keyword);
  };
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        onChange={(event) => setKeyword(event.target.value)}
        value={keyword || ''}
        maxLength="50"
        className="input input__search"
        type="text"
        placeholder="Enter topic"
      />
      <button
        aria-label="Search"
        className="button button__search"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
