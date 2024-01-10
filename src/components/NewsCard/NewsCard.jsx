/*eslint-disable*/
import React, { useState, useEffect, forwardRef, useRef } from 'react';
import './NewsCard.css';
import CardType from '../../constants/enums/CardType';
import Button from '@mui/material/Button';
import { Divider, setRef } from '@mui/material';
import ReactionBadge from '../ReactionBadge/ReactionBadge';
import ReactionType from '../../constants/enums/ReactionType';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import { formatNumberWithLetter } from '../../utils/helpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import imageNotAvailable from '../../images/Image_not_available.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpandableTitle from '../ExpandableTitle/ExpandableTitle';
import SaveOrRemoveButton from '../SaveOrRemoveButton/SaveOrRemoveButton';
import ReactionPicker from '../ReactionPicker/ReactionPicker';
import useSwipe from '../../utils/hooks/useSwipe';

import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
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
  isSlider,
  slide,
}) {
  const { keyword, title, date, source, link, image, reactions, text } =
    cardData;
  /*   const [isReactionsOpen, setIsReactionsOpen] = React.useState(false);
  const [selectedReaction, setSelectedReaction] = React.useState(null);
 */
  const [isSwiped, setIsSwiped] = useState(false);
  const isBookmark = bookmarkCards?.includes(link) ? true : false;
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    minSwipeDistance: 80,
    onSwipeLeft: () => console.log('Swiped left'),
    onSwipeRight: () => console.log('Swiped right'),
    onSwipeUp: () => console.log('Swiped up'),
    onSwipeDown: () => console.log('Swiped down'),
    onSwipeEnd: () => console.log('Swipe ended'),
  });
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  /*   const reactionsRef = useRef(null);
   */
  /*   useClickOutside(reactionsRef, false, () => {
    setIsReactionsOpen(false);
  }); */

  const handleReactionSelect = ({ type }) => {
    if (!type) return;

    const reactionData = {
      type,
      link: cardData.link,
    };
    onReactionSelect(reactionData, cardData);
  };

  const handleRemoveReaction = () => {
    onRemoveReaction(cardData);
  };

  const handleOnUniqueReactionsClick = () => {
    onUniqueReactionsClick(cardData);
  };

  return (
    <article
      className={`card ${classList?.card} ${slide && `card__slider_${slide}`}`}
    >
      <div className={`card__image-wrapper ${classList?.imageWrapper}`}>
        <div
          className={`card__controls-wrapper ${
            elementsToHide?.controlsWrapper && 'display-none'
          }`}
        >
          <SaveOrRemoveButton
            onSaveClick={() => onCardBookmarkClick(cardData, isBookmark)}
            onRemoveClick={() => onCardRemoveClick(cardData)}
            loggedIn={loggedIn}
            type={cardType}
            isSaved={isBookmark}
          />
          {showKeyword && <span className="card__keyword">{keyword}</span>}
        </div>

        {!isImageLoaded && (
          <img
            className={`card__image ${classList?.image} image__preloader ${
              elementsToHide?.imagePreloader && 'display-none'
            } ${isSlider && 'card__slider_type_image'}`}
          />
        )}
        {!elementsToHide?.image && (
          <LazyLoadImage
            className={`card__image ${classList?.image}`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            src={image || imageNotAvailable}
            effect="blur"
            onLoad={() => {
              setIsImageLoaded(true);
            }}
          />
        )}

        {reactions && (
          <ReactionBadge
            onUniqueReactionsClick={handleOnUniqueReactionsClick}
            reactionsCountByType={reactions.countByType}
            classList={'reactions__list_type_article'}
          />
        )}
      </div>
      <Divider />

      <div
        className={`card__reactions-warper ${
          elementsToHide?.reactionsWarper && 'display-none'
        }`}
      >
        <Button onClick={() => onCardShare(cardData)}>
          <ShareIcon />
        </Button>
        {!elementsToHide?.comment && (
          <Button onClick={() => onCommentClick(cardData)}>
            <CommentIcon />{' '}
            <span className="reaction__text-button">
              {formatNumberWithLetter(cardData?.comments?.count)}
            </span>
          </Button>
        )}
        <ReactionPicker
          onReactionSelect={handleReactionSelect}
          onRemoveReaction={handleRemoveReaction}
          reaction={reactions?.ownerReactionType}
        />
      </div>
      <Divider />
      <div
        className={`card__text-wrapper ${
          classList?.textWrapper ? classList.textWrapper : ''
        }`}
      >
        <p className={`card__date ${elementsToHide?.date && 'display-none'}`}>
          {date}
        </p>
        <ExpandableTitle title={title} />

        <p
          dir="auto"
          className={`card__text ${classList?.text}  ${
            elementsToHide?.text && 'display-none'
          }`}
        >
          {text}
        </p>
      </div>
      <a className="card__source" target="_blank" rel="noreferrer" href={link}>
        {source}
      </a>
    </article>
  );
}
