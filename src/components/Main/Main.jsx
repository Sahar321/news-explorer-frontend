/*eslint-disable*/
import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import About from '../About/About.jsx';
import NewsCardList from '../NewsCardList/NewsCardList.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import SearchSection from '../SearchSection/SearchSection.jsx';
import './Main.css';

export default function Main({
  cards,
  loggedIn,
  onCardBookmarkClick,
  onSearchSubmit,
  onShowMoreClick,
}) {
  return (
    <main className="main">
      <SearchSection
        title="What's going on in the world?"
        text="Find the latest news on any topic and save them in your personal
        account."
      >
        <SearchForm onSearchSubmit={onSearchSubmit} />
      </SearchSection>
      <h2 className={`card-list__search-results`}>Search results</h2>
      <NewsCardList
        onCardBookmarkClick={onCardBookmarkClick}
        loggedIn={loggedIn}
        showTitle={true}
        cards={cards}
        onShowMoreClick={onShowMoreClick}
      />
      <About />
    </main>
  );
}
