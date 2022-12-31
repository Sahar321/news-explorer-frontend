/*eslint-disable*/
import React from 'react';
import './NewsCard.css';
import CardType  from '../../constants/enums/CardType.js';
export default function NewsCard({
  cardData,
  cardType,
  showKeyword,
  loggedIn,
  onCardBookmarkClick,
  onCardRemoveClick,
  isBookmarked,
}) {

  const handleCardBookmarkClick = () => {
    onCardBookmarkClick(cardData);
  };
  const handleCardRemoveClick = () => {
    console.log('handleCardRemoveClick', cardData);
    onCardRemoveClick(cardData);
  };
  const { keyword, title, text, date, source, link, image } = cardData;

  const bookmarkButton = (
    <>
      <button
        aria-label="bookmark Card"
        className={`button button__bookmark button__bookmark_isActive_${isBookmarked} card__button`}
        disabled={!loggedIn}
        onClick={handleCardBookmarkClick}
      />
      {!loggedIn && (
        <span className="card__tooltip">Sign in to save articles</span>
      )}
    </>
  );

  const removeButton = (
    <>
      <button
        aria-label="remove Card"
        className="button button_type_remove card__button"
        onClick={handleCardRemoveClick}
      />
      <span className="card__tooltip">Remove from saved</span>
    </>
  );
  return (
    <article className="card">
      <div className="card__image-wrapper">
        <div className="card__controls-wrapper">
          {cardType === CardType.REMOVE ? removeButton : bookmarkButton}
         {/*  {showKeyword && <span className={`card__keyword`}>{keyword}</span>} */}
         {<span className={`card__keyword`}>{keyword}</span>}
        </div>
        <img className="card__image" src={image} alt="card" />
      </div>
      <div className="card__text-wrapper">
        <p className="card__date">{date}</p>
        <h3 className="card__title">{title}</h3>
        <p className="card__text">{text}</p>
        <a className="card__source" target="_blank" href={link}>
          {source}
        </a>
      </div>
    </article>
  );
}
