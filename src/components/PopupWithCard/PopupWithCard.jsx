/*eslint-disable*/
import React, { useState } from 'react';
import Comment from '../Comment/Comment.jsx';
import ChatMessage from '../ChatMessage/ChatMessage.jsx';

import useCloseOnEscape from '../../utils/hooks/useCloseOnEscape';
import './PopupWithCard.css';
import useScreenWidth from '../../utils/hooks/useScreenWidth';
import NewsCard from '../NewsCard/NewsCard.jsx';

import { Divider } from '@mui/material';

export default function PopupWithCard({
  cardData,
  onClose,
  isOpen,
  onCommentSubmit,
  comments,
  onThankYou,
  onReactionSelect,
  onUniqueReactionsClick,
  onRemoveReaction,
  onCardBookmarkClick,
  onCardRemoveClick,
  bookmarkCards,
  loggedIn,
  onCardShare,
}) {
  const screenWidth = useScreenWidth();
  useCloseOnEscape(isOpen, onClose);



  const handleOnCommentSubmit = (value) => {
    const { link } = cardData;
    onCommentSubmit({ link, text: value });
    setIsWriteCommentOpen(false);
  };

  const cardClasses = {
    card: 'card_type_popup',
    imageWrapper: 'card__image-wrapper_type_popup',
    image: 'card__image_type_popup',
    textWrapper: 'card__text-wrapper_type_popup',
    text: 'card__text_type_popup',
    title: 'card__title_type_popup',
  };

  const elementsToHide = {
    comment: true,
    title: true,
    date: true,
    source: true,
  };

  return (
    <div className={`popup popup_isVisible_${isOpen}`}>
      <div className="popup__container popup__container_type_card">
        <button
          aria-label="Close Popup"
          className="button button_type_close popup__button-close_type_card"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="card__title popup__title_type_card">
          {`${cardData.source} - ${cardData.date}`}
        </h2>

        <NewsCard
          cardData={cardData}
          elementsToHide={elementsToHide}
          classList={cardClasses}
          onReactionSelect={onReactionSelect}
          onUniqueReactionsClick={onUniqueReactionsClick}
          onRemoveReaction={onRemoveReaction}
          onCardBookmarkClick={onCardBookmarkClick}
          onCardRemoveClick={onCardRemoveClick}
          bookmarkCards={bookmarkCards}
          loggedIn={loggedIn}
          onCardShare={onCardShare}
        />
        <Divider />
        <Divider />
        <div className="popup__comments">
          <div className="message-list">
            {!comments.length > 0 && (
              <h3 className="message-list__empty-title">No comments yet...</h3>
            )}

            {comments?.map((comment, index) => (
              <>
                <ChatMessage
                  key={index}
                  index={index + 1}
                  comment={comment}
                  onThankYou={onThankYou}
                />
              </>
            ))}
          </div>

          <Comment onCommentSubmit={handleOnCommentSubmit} isOpen={true} />
        </div>
      </div>
    </div>
  );
}
