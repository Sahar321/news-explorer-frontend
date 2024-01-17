/* eslint-disable  */
import React, { useEffect } from 'react';
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
  bookmarkCards,
  onReactionSelect,
  onCommentClick,
  onUniqueReactionsClick,
  onRemoveReaction,
  onCardShare,
}) {


  const bonShowMoreClick = () => {
    console.log('cards', cards.length);
    onShowMoreClick();
  };

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
            onRemoveReaction={onRemoveReaction}
            bookmarkCards={bookmarkCards}
            onReactionSelect={onReactionSelect}
            onCommentClick={onCommentClick}
            onUniqueReactionsClick={onUniqueReactionsClick}
            onCardShare={onCardShare}
          />
        ))}
      </div>
      {cards?.length > cardsToShow.length && (
        <button
          aria-label="Show More"
          type="button"
          className="button button__show-more"
          onClick={bonShowMoreClick}
        >
          Show more
        </button>
      )}
    </section>
  );
}
