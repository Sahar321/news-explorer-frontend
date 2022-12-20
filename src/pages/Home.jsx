import React from 'react';
import Main from '../components/Main/Main.jsx';

export default function Home({ onSearchSubmit }) {
  return (
    <>
      <Main onSearchSubmit={onSearchSubmit} />
    </>
  );
}
