import React from 'react';
import Preloader from '../Preloader/Preloader.jsx';
import './SearchPreloader.css';

export default function SearchPreloader() {
  return (
    <>
      <div className='search-loading'>
        <Preloader isVisible={true} className='search-loading__icon' />
        <span className='search-loading__text'>Searching for news...</span>
      </div>

    </>
  );
}
