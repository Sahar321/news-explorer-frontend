/*eslint-disable*/
import React, { useDebugValue, useEffect } from 'react';
import './NewsCard.css';
import CardType from '../../constants/enums/CardType';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';

import ReactionsList from '../ReactionsList/ReactionsList';
import ReactionType from '../../constants/enums/ReactionType';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { formatNumberWithLetterShortcut } from '../../utils/helpers';
import anime from 'animejs/lib/anime.es.js';
import 'animate.css';
export default function NewsCard({
  cardData,
  cardType,
  showKeyword,
  loggedIn,
  onCardBookmarkClick,
  onCardRemoveClick,
  bookmarkCards,
  onCommentClick,
  classList,
  onReactionSelect,
  onUniqueReactionsClick,
  onRemoveReaction,
  elementsToHide,
  onCardShare,
}) {
  const [isReactionsOpen, setIsReactionsOpen] = React.useState(false);
  const [selectedReaction, setSelectedReaction] = React.useState(
    <AddReactionIcon />
  );

  const { keyword, title, description, date, source, link, image, reaction } =
    cardData;
  const handleOnCardShare = () => {
    onCardShare(cardData);
  };
  useEffect(() => {
    const userCardReaction = cardData?.reaction?.find(
      (reaction) => reaction.isOwner === true
    );
    console.log('userCardReaction', userCardReaction);
    if (!userCardReaction) return;
    handleSetReaction(userCardReaction.reactionId);
  }, [cardData.reaction]);

  const isBookmark = bookmarkCards?.includes(link) ? true : false;
  const isBookmarkActiveClass = isBookmark
    ? 'button__bookmark_type_active'
    : '';
  const isBookmarkDisabledClass = !loggedIn
    ? 'button__bookmark_type_disabled'
    : '';
  const handleCardBookmarkClick = () => {
    onCardBookmarkClick(cardData, isBookmark);
  };
  const handleCardRemoveClick = () => {
    onCardRemoveClick(cardData);
  };
  useEffect(() => {
    if (isBookmark) {
      console.log('cardData', cardData);
    }
  }, [isBookmark]);
  const bookmarkButton = (
    <>
      <button
        aria-label="bookmark Card"
        className={`button button__bookmark card__button  ${
          isBookmarkActiveClass + isBookmarkDisabledClass
        }`}
        onClick={handleCardBookmarkClick}
      />
      {!loggedIn && (
        <span className="card__tooltip">Sign in to save articles</span>
      )}
    </>
  );

  const handleReactions = () => {
    setIsReactionsOpen(!isReactionsOpen);
  };

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

  const handleSetReaction = (reactionId) => {
    if (!reactionId) return;
    const reaction = ReactionType[reactionId];
    const reactionImg = <img width="30px" src={reaction} />;
    setSelectedReaction(reactionImg);
  };

  const handleReactionsClick = (e) => {
    // handleSetReaction(e.target.id);
    handleReactions();
    const reactionData = {
      reactionId: e.target.id,
      link: cardData.link,
    };
    onReactionSelect(reactionData, cardData);
  };

  const handleRemoveReaction = () => {
    setSelectedReaction(<AddReactionIcon />);
    onRemoveReaction(cardData);
    setIsReactionsOpen(false);
  };

  const handleOnCommentClick = (e) => {
    onCommentClick(cardData);
  };

  const handleOnUniqueReactionsClick = () => {
    onUniqueReactionsClick(cardData);
  };

  useEffect(() => {
    if (!isReactionsOpen) return;
/*     anime({
      targets: "#WOW,#LOL,#LIKE,#SAD,#LOVE",
      scale: [
        {value: .1, easing: 'easeInElastic', duration: 0},
        {value: 1, easing: 'easeInElastic', duration: 400}
      ],
      delay: anime.stagger(200, {grid: [5, 1], from: 'center'})
    }); */
  }, [isReactionsOpen]);

  return (
    <article className={`card ${classList?.card ? classList.card : ''}`}>
      <div
        className={`card__image-wrapper ${
          classList?.imageWrapper ? classList.imageWrapper : ''
        }`}
      >
        <div className={`card__controls-wrapper`}>
          {cardType === CardType.REMOVE ? removeButton : bookmarkButton}
          {showKeyword && <span className="card__keyword">{keyword}</span>}
        </div>
        <img
          className={`card__image ${classList?.image ? classList.image : ''}`}
          src={image}
          alt="card"
        />
        {reaction?.length > 0 && (
          <ReactionsList
            onUniqueReactionsClick={handleOnUniqueReactionsClick}
            reactions={reaction}
            classList={'reactions__list_type_article'}
          />
        )}
      </div>
      <Divider />

      <div className="card__reactions-warper">
        <div  className={`reactions  reactions_visible_${isReactionsOpen}`}>
          <svg
            id="closeRections"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            onClick={handleRemoveReaction}
          >
            <path
              fill="currentColor"
              d="m22.357 20 8.821 8.821-2.357 2.357L18.35 20.707a1 1 0 0 1 0-1.414L28.82 8.82l2.357 2.357L22.357 20Z"
            />
            <path
              fill="currentColor"
              d="M18.13 20 9.31 28.82l2.356 2.357 10.472-10.471a1 1 0 0 0 0-1.414L11.666 8.82 9.31 11.178 18.131 20Z"
            />
          </svg>
          <img
            alt="lol"
            id="LOL"
            onClick={handleReactionsClick}
            width="30px"
            className='animate__animated animate__bounceIn'
            src={ReactionType['LOL']}
          />
          <img
            alt="wow"
            id="WOW"
            onClick={handleReactionsClick}
            width="30px"
            className='animate__animated animate__bounceIn'
            src={ReactionType['WOW']}
          />
          <img
            alt="LIKE"
            id="LIKE"
            onClick={handleReactionsClick}
            width="30px"
            className='animate__animated animate__bounceIn'
            src={ReactionType['LIKE']}
          />
          <img
            alt="SAD"
            id="SAD"
            onClick={handleReactionsClick}
            width="30px"
            className='animate__animated animate__bounceIn'
            src={ReactionType['SAD']}
          />
          <img
            alt="love"
            id="LOVE"
            onClick={handleReactionsClick}
            width="30px"
            className='animate__animated animate__bounceIn'
            src={ReactionType['LOVE']}
          />
        </div>
        <Button onClick={handleOnCardShare}>
          <ShareIcon />
        </Button>
        {!elementsToHide?.comment ? (
          <Button onClick={handleOnCommentClick}>
            <CommentIcon />{' '}
            <span className="reaction__text-button">
              {formatNumberWithLetterShortcut(cardData?.comments?.length)}
            </span>
          </Button>
        ) : (
          ''
        )}
        <Button onClick={handleReactions}>
          {selectedReaction}
          <span className="reaction__text-button">
            {formatNumberWithLetterShortcut(cardData?.reaction?.length)}
          </span>
        </Button>
      </div>
      <Divider />
      <div
        className={`card__text-wrapper ${
          classList?.textWrapper ? classList.textWrapper : ''
        }`}
      >
        {!elementsToHide?.date ? <p className="card__date">{date}</p> : ''}

        <h3
          dir="auto"
          className={`card__title ${classList?.title ? classList.title : ''}`}
        >
          {title}
        </h3>

        <p
          dir="auto"
          className={`card__text ${classList?.text ? classList.text : ''}`}
        >
          {description}
        </p>
        <a
          className="card__source"
          target="_blank"
          rel="noreferrer"
          href={link}
        >
          {!elementsToHide?.source ? source : ''}
        </a>
      </div>
    </article>
  );
}
