import React from 'react';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <form className="search-form">
      <input maxLength="50" className="input input__search" type="text" placeholder="Enter topic" />
      <button aria-label="Search" className="button button__search" type="submit">
        Search
      </button>
    </form>
  );
}
