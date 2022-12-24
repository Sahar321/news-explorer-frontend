/* eslint-disable  */
import React from 'react';
import { useLocation } from 'react-router-dom';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.jsx';

export default function NewsCardList({ cards, loggedIn, onCardBookmarkClick }) {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const selectedPage = isHomePage ? 'home' : 'saved-articles';
  const cardButtonType = isHomePage ? 'bookmark' : 'remove';
  return (
    <section className="card-list">
      <h2
        className={`card-list__search-results card-list__search-results_isVisible_${isHomePage}`}
      >
        Search results
      </h2>
      <div
        className={`card-list__cards-wrapper card-list__cards-wrapper_page_${selectedPage}`}
      >
        {cards?.map((card, index) => (
          <NewsCard
            key={index}
            cardData={card}
            cardType={'bookmark'}
            loggedIn={loggedIn}
            onCardBookmarkClick={onCardBookmarkClick}
          />
        ))}
      </div>
      {isHomePage && (
        <button
          aria-label="Show More"
          type="button"
          className="button button__show-more"
        >
          Show more
        </button>
      )}
    </section>
  );
}
