/*eslint-disable*/
import React, { useDebugValue, useEffect, forwardRef, useRef } from 'react';
import './NewsCard.css';
import CardType from '../../constants/enums/CardType';
import Button from '@mui/material/Button';
import { Divider, setRef } from '@mui/material';
import useClickOutside from '../../utils/hooks/useClickOutside';
import ReactionsList from '../ReactionsList/ReactionsList';
import ReactionType from '../../constants/enums/ReactionType';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { formatNumberWithLetter } from '../../utils/helpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import imageNotAvailable from '../../images/Image_not_available.png';
import anime from 'animejs/lib/anime.es.js';
import Preloader from '../Preloader/Preloader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import { set } from 'animejs';
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
  const titleRef = useRef(null);
  const [isTitleOverflow, setIsTitleOverflow] = React.useState(false);
  const [isTitleOverflowVisible, setIsTitleOverflowVisible] =
    React.useState(false);
  const { keyword, title, date, source, link, image, reactions, text } =
    cardData;
  const [isReactionsOpen, setIsReactionsOpen] = React.useState(false);
  const [selectedReaction, setSelectedReaction] = React.useState(null);

  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  useEffect(() => {
    if (!reactions) return;
    setSelectedReaction(ReactionType[reactions.ownerReactionType]);
  }, [reactions]);

  const reactionsRef = useRef(null);

  useClickOutside(reactionsRef, false, () => {
    setIsReactionsOpen(false);
  });

  const handleOnCardShare = () => {
    onCardShare(cardData);
  };

  useEffect(() => {
    if (!titleRef.current || !title) return;
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);
  const checkOverflow = () => {
    const titleHeight = titleRef.current.offsetHeight;
    const titleScrollHeight = titleRef.current.scrollHeight;
    if (titleHeight + 4 < titleScrollHeight) {
      setIsTitleOverflow(true);
    } else {
      setIsTitleOverflow(false);
    }
  };

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

  const handleReactionsClick = (evt) => {
    if (!evt.target.id) {
      setIsReactionsOpen(!isReactionsOpen);
      return;
    }

    setIsReactionsOpen(!isReactionsOpen);
    const reactionData = {
      type: evt.target.id,
      link: cardData.link,
    };
    onReactionSelect(reactionData, cardData);
  };

  const handleRemoveReaction = () => {
    onRemoveReaction(cardData);
    setIsReactionsOpen(false);
  };

  const handleOnCommentClick = (e) => {
    onCommentClick(cardData);
  };

  const handleOnUniqueReactionsClick = () => {
    console.log('handleOnUniqueReactionsClick');
    onUniqueReactionsClick(cardData);
  };
  const toggleExpandTitle = () => {
    setIsTitleOverflowVisible(!isTitleOverflowVisible);
  };

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

        {!isImageLoaded && (
          <img
            className={`card__image ${
              classList?.image ? classList.image : ''
            } image__preloader`}
          />
        )}

        <LazyLoadImage
          className={`card__image ${classList?.image ? classList.image : ''}`}
          src={image || imageNotAvailable}
          effect="blur"
          onLoad={(e) => {
            setIsImageLoaded(true);
          }}
        />

        {reactions && (
          <ReactionsList
            onUniqueReactionsClick={handleOnUniqueReactionsClick}
            reactionsCountByType={reactions.countByType}
            classList={'reactions__list_type_article'}
          />
        )}
      </div>
      <Divider />

      <div ref={reactionsRef} className="card__reactions-warper">
        <div
          onClick={handleReactionsClick}
          className={`reactions  reactions_visible_${isReactionsOpen}`}
        >
          <svg
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
            width="30px"
            className="reaction__icon-select animate__animated animate__bounceIn"
            src={ReactionType['LOL']}
          />
          <img
            alt="wow"
            id="WOW"
            width="30px"
            className="reaction__icon-select animate__animated animate__bounceIn"
            src={ReactionType['WOW']}
          />
          <img
            alt="LIKE"
            id="LIKE"
            width="30px"
            className="reaction__icon-select animate__animated animate__bounceIn"
            src={ReactionType['LIKE']}
          />
          <img
            alt="SAD"
            id="SAD"
            width="30px"
            className="reaction__icon-select animate__animated animate__bounceIn"
            src={ReactionType['SAD']}
          />
          <img
            alt="love"
            id="LOVE"
            width="30px"
            className="reaction__icon-select animate__animated animate__bounceIn"
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
              {formatNumberWithLetter(cardData?.comments?.count)}
            </span>
          </Button>
        ) : (
          ''
        )}
        <Button onClick={handleReactionsClick}>
          {selectedReaction ? (
            <img width="30px" src={selectedReaction} />
          ) : (
            <AddReactionIcon />
          )}

          <span className="reaction__text-button">
            {formatNumberWithLetter(cardData?.reaction?.length)}
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
          ref={titleRef}
          dir="auto"
          className={`card__title ${classList?.title ? classList.title : ''} ${
            isTitleOverflowVisible && 'card__title_overflow'
          }`}
        >
          {title}
        </h3>
        {isTitleOverflow && (
          <FontAwesomeIcon
            onClick={toggleExpandTitle}
            className={`chevron ${!isTitleOverflowVisible && 'chevron_type_up'}`}
            icon={faCircleChevronUp}
            /*  icon={
              isTitleOverflowVisible ? faCircleChevronUp : faCircleChevronDown
            } */
          />
        )}
        <p
          dir="auto"
          className={`card__text ${classList?.text ? classList.text : ''}`}
        >
          {text}
        </p>
      </div>
      <a className="card__source" target="_blank" rel="noreferrer" href={link}>
        {!elementsToHide?.source ? source : ''}
      </a>
    </article>
  );
}
