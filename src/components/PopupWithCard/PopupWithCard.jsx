/*eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import CommentInput from '../CommentInput/CommentInput.jsx';
import ChatMessage from '../ChatMessage/ChatMessage.jsx';
import CommentsList from '../CommentsList.jsx';
import useCloseOnEscape from '../../utils/hooks/useCloseOnEscape';
import './PopupWithCard.css';
import useScreenWidth from '../../utils/hooks/useScreenWidth';
import NewsCard from '../NewsCard/NewsCard.jsx';
import Carousel from '../Carousel/Carousel.jsx';
import { Divider } from '@mui/material';
import { set } from 'animejs';

export default function PopupWithCard({
  indexStart,
  onClose,
  isOpen,
  cards,
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
  const [cardData, setCardData] = useState();

  useEffect(() => {
    console.log(indexStart);
    const za = cards[indexStart];
    setCardData(cards[indexStart]);
  }, [cards, indexStart]);
  const handleOnClose = () => {
    //popup popup_isVisible_${isOpen}
    setCloseClass('popup close-slide-down popup_isVisible_true');
    setTimeout(() => {
      setCloseClass(`popup popup_isVisible_${isOpen}`);
      onClose();
    }, 700);
  };

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
  }, [cardData?.comments]);

  const [closeClass, setCloseClass] = useState('popup popup_isVisible_false');

  useEffect(() => {
    setCloseClass(`popup popup_isVisible_${isOpen}`);
  }, [isOpen]);

  //    <div className={`popup popup_isVisible_${isOpen} `}>
  return (
    <div className={`${closeClass}`}>
      <div className="popup__container popup__container_type_card">
        <button
          aria-label="Close Popup"
          className="button button_type_close popup__button-close_type_card"
          type="button"
          onClick={handleOnClose}
        ></button>
        <h2 className="card__title popup__title_type_card">
          {`${cardData?.source}`} <br />{' '}
          <span
            style={{ fontSize: '14px', marginTop: '5px' }}
          >{`${cardData?.date}`}</span>
        </h2>

        <Carousel data={cards} indexStart={indexStart} />

        <Divider style={{ width: '90%', marginTop: 20 }} />

        <div className="popup__comments">
          <CommentInput onCommentSubmit={handleOnCommentSubmit} isOpen={true} />

          <div ref={messageListRef} className="message-list">
            {!cardData?.comments?.count > 0 && (
              <h3 className="message-list__empty-title">
                Be the first to comment...
              </h3>
            )}

            <CommentsList
              comments={cardData?.comments?.data}
              onThankYou={onThankYou}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
