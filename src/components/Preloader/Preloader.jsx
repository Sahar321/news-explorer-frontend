import React from 'react';
import './Preloader.css';

export default function Preloader({ className, isVisible }) {
  return (
    <>
      <i className={`preloader preloader_visible_${isVisible}  ${className}`}></i>
    </>
  );
}
