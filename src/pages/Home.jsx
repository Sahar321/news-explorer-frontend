import React from 'react';
import Main from '../components/Main/Main.jsx';

export default function Home({
  onSearchSubmit,
  loggedIn,
  onCardBookmarkClick,
}) {
  return (
    <>
      <Main
        onCardBookmarkClick={onCardBookmarkClick}
        onSearchSubmit={onSearchSubmit}
        loggedIn={loggedIn}
      />
    </>
  );
}
