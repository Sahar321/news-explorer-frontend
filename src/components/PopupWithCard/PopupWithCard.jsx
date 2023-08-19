/*eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import Comment from '../Comment/Comment.jsx';
import ChatMessage from '../ChatMessage/ChatMessage.jsx';
import CommentsList from '../CommentsList.jsx';
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
  useCloseOnEscape(isOpen, onClose);
  const messageListRef = useRef(null);
  const handleOnCommentSubmit = (value) => {
    const { link } = cardData;
    onCommentSubmit(cardData, { link, text: value });
  };

  useEffect(() => {
    const elm = messageListRef.current;
    console.log(elm.scrollHeight);
    elm.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [cardData.comments]);

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
          {`${cardData.source}`} <br />{' '}
          <span
            style={{ fontSize: '14px', marginTop: '5px' }}
          >{`${cardData.date}`}</span>
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
          <Comment onCommentSubmit={handleOnCommentSubmit} isOpen={true} />
          <div ref={messageListRef} className="message-list">
            {!cardData.comments?.length > 0 && (
              <h3 className="message-list__empty-title">
                Be the first to comment...
              </h3>
            )}

            <CommentsList
              comments={cardData.comments}
              onThankYou={onThankYou}
            />

            {/*             {cardData.comments
              ?.slice()
              .reverse()
              .map((comment, index, array) => (
                <ChatMessage
                  key={array.length - index - 1}
                  index={array.length - index}
                  comment={comment}
                  onThankYou={onThankYou}
                />
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
