import React from 'react';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className='not-found'>
      <i className='not-found__icon'></i>
      <h3 className='not-found__title'>Nothing found</h3>
      <span className='not-found__text'>
        Sorry, but nothing matched<br />your search terms.
      </span>
    </div>
  );
}
