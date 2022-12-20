import React from 'react';
import './Preloader.css';

export default function Preloader({ className }) {
  return (
    <>
      <i className={`preloader ${className}`}></i>
    </>
  );
}
