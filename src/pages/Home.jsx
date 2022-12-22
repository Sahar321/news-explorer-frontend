import React from 'react';
import Main from '../components/Main/Main.jsx';

export default function Home({ onSearchSubmit, loggedIn }) {
  return (
    <>
      <Main onSearchSubmit={onSearchSubmit} loggedIn={loggedIn} />
    </>
  );
}
