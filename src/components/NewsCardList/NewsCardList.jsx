/* eslint-disable  */
import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.jsx';

export default function NewsCardList({
  cardsToShow,
  loggedIn,
  onCardBookmarkClick,
  onShowMoreClick,
  cards,
  cardType,
  pageClassName,
  onCardRemoveClick,
  showKeyword,
}) {
  return (
    <section className="card-list">
      <div className={`card-list__cards-wrapper ${pageClassName}`}>
        {cardsToShow?.map((card, index) => (
          <NewsCard
            key={index}
            cardData={card}
            cardType={cardType}
            loggedIn={loggedIn}
            onCardRemoveClick={onCardRemoveClick}
            onCardBookmarkClick={onCardBookmarkClick}
            showKeyword={showKeyword}
          />
        ))}
      </div>
      {cards?.length > 0 && (
        <button
          aria-label="Show More"
          type="button"
          className="button button__show-more"
          onClick={onShowMoreClick}
        >
          Show more
        </button>
      )}
    </section>
  );
}
