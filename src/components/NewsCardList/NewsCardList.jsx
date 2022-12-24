/* eslint-disable  */
import React from 'react';
import { useLocation } from 'react-router-dom';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.jsx';

export default function NewsCardList({ cards, loggedIn, onCardBookmarkClick }) {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const selectedPage = isHomePage ? 'home' : 'saved-articles';
  return (
    <section className="card-list">
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
