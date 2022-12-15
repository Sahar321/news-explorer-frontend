import React from 'react';
import './Preloader.css';

export default function Preloader({ isVisible }) {
  return (
    <>
      <i className={`${isVisible && 'circle-preloader'}`}></i>
    </>
  );
}
