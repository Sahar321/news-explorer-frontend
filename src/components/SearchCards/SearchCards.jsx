import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './SearchCards.css';

export default function SearchCards({ onSearchSubmit }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(keyword);
  };
  return (
    <form onSubmit={handleSubmit} className="searchCards">
      <input
        onChange={(event) => setKeyword(event.target.value)}
        value={keyword || ''}
        maxLength="50"
        className="input input__search_cards "
        type="text"
        placeholder="Enter topic"
      />
      <button
        aria-label="Search"
        className="button button__search_cards"
        type="submit"
        disabled={!keyword}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
