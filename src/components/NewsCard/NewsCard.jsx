/*eslint-disable*/
import React, { useEffect } from 'react';
import './NewsCard.css';
import CardType from '../../constants/enums/CardType';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';

import icon1 from '../../images/icons/reactions/popup/icon1.png';
import icon2 from '../../images/icons/reactions/popup/icon2.png';
import icon3 from '../../images/icons/reactions/popup/icon3.png';
import icon4 from '../../images/icons/reactions/popup/icon4.png';
import icon5 from '../../images/icons/reactions/popup/icon5.png';

import AddReactionIcon from '@mui/icons-material/AddReaction';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';

export default function NewsCard({
  cardData,
  cardType,
  showKeyword,
  loggedIn,
  onCardBookmarkClick,
  onCardRemoveClick,
  bookmarkCards,
  onReactionSelect,
}) {
  const REACTIONS_ICONS = {
    lol: icon1,
    wow: icon2,
    like: icon3,
    sad: icon4,
    love: icon5,
  };
  const [isReactionsOpen, setIsReactionsOpen] = React.useState(false);
  const [selectedReaction, setSelectedReaction] = React.useState(
    <AddReactionIcon />
  );
  const { keyword, title, text, date, source, link, image, reactionId } =
    cardData;

  useEffect(() => {
    console.log('NewsCardRRreactionId', cardData);
    handleSetReaction(cardData.reactionId);
  }, []);
  console.log('NewsCardRRreactionId', cardData);

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

  const handleShare = () => {
    navigator.share('asd');
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
    const reaction = REACTIONS_ICONS[reactionId];
    const reactionImg = <img width="30px" src={reaction} />;
    setSelectedReaction(reactionImg);
  };

  const handleReactionsClick = (e) => {
    console.log('clicked on ', e.target.id);
    handleSetReaction(e.target.id);

    handleReactions();

    const reactionData = {
      reactionId: e.target.id,
      articleId: cardData.link,
    };
    onReactionSelect(reactionData);
  };

  return (
    <article className="card">
      <div className="card__image-wrapper">
        <div className="card__controls-wrapper">
          {cardType === CardType.REMOVE ? removeButton : bookmarkButton}
          {showKeyword && <span className="card__keyword">{keyword}</span>}
        </div>
        <img className="card__image" src={image} alt="card" />
      </div>
      <Divider />
      <div className={`reactions reactions_visible_${isReactionsOpen}`}>
        <img
          alt="lol"
          id="lol"
          onClick={handleReactionsClick}
          width="30px"
          src={icon1}
        />
        <img
          alt="wow"
          id="wow"
          onClick={handleReactionsClick}
          width="30px"
          src={icon2}
        />
        <img
          alt="like"
          id="like"
          onClick={handleReactionsClick}
          width="30px"
          src={icon3}
        />
        <img
          alt="lol"
          id="sad"
          onClick={handleReactionsClick}
          width="30px"
          src={icon4}
        />
        <img
          alt="love"
          id="love"
          onClick={handleReactionsClick}
          width="30px"
          src={icon5}
        />
      </div>
      <div className="card__reactions-warper">
        <Button>
          <ShareIcon />
        </Button>
        <Button>
          <CommentIcon />
        </Button>
        <Button onClick={handleReactions}>{selectedReaction}</Button>
      </div>
      <Divider />
      <div className="card__text-wrapper">
        <p className="card__date">{date}</p>
        <h3 className="card__title">{title}</h3>
        <p className="card__text">{text}</p>
        <a
          className="card__source"
          target="_blank"
          rel="noreferrer"
          href={link}
        >
          {source}
        </a>
      </div>
    </article>
  );
}
