import React, { useEffect } from 'react';
import './NewsCard.css';
import imgBeach from '../../images/cards/beach.jpg';
/* import imgChair from '../../images/cards/chair.jpg';
import imgCity from '../../images/cards/city.jpg';
import imgDog from '../../images/cards/dog.png';
import imgGoat from '../../images/cards/goat.png';
import imgLaptop from '../../images/cards/laptop.jpg';
import imgRiver from '../../images/cards/river.png';
 */

export default function NewsCard({ buttonType, loggedIn, onCardBookmarkClick }) {
  const [buttonClass, setButtonClass] = React.useState('');
  const [tooltip, setTooltip] = React.useState('');
  useEffect(() => {
    switch (buttonType) {
      case 'remove':
        setButtonClass('button_type_remove');
        setTooltip('Remove from saved');
        break;
      case 'bookmark':
        setButtonClass('button__bookmark');
        setTooltip('Sign in to save articles'); // TODO: should depend on user logging status

        break;
      default:
    }
  }, [buttonType]);

  return (
    <article className="card">
      <div className="card__image-wrapper">
        <div className="card__controls-wrapper">
          <button
            aria-label={`${buttonType} Card`}
            className={`button ${buttonClass} card__button`}
            disabled={!loggedIn}
            onClick={onCardBookmarkClick}
          />
          {!loggedIn && <span className="card__tooltip">{tooltip}</span>}
          <span
            className={`card__keyword ${
              buttonType !== 'remove' && 'card_keyword_visibility_hide'
            }`}
          >
            Nature
          </span>
        </div>
        <img className="card__image" src={imgBeach} alt="card" />
      </div>
      <div className="card__text-wrapper">
        <p className="card__date">November 4, 2020</p>
        <h3 className="card__title">
          Everyone Needs a Special &apos;Sit Spot&apos; in Nature
        </h3>
        <p className="card__text">
          {`Ever since I read Richard Louv's influential book, "Last Child in the
        Woods," the idea of having a special "sit spot" has stuck with me. This
        advice, which Louv attributes to nature educator Jon Young, is for both
        adults and children to find...`}
        </p>
        <p className="card__source">treehugger</p>
      </div>
    </article>
  );
}
