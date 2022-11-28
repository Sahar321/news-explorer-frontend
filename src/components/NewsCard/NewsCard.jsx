import React from 'react';
import './NewsCard.css';
import imgBeach from '../../images/cards/beach.jpg';
/* import imgChair from '../../images/cards/chair.jpg';
import imgCity from '../../images/cards/city.jpg';
import imgDog from '../../images/cards/dog.png';
import imgGoat from '../../images/cards/goat.png';
import imgLaptop from '../../images/cards/laptop.jpg';
import imgRiver from '../../images/cards/river.png';
 */
export default function NewsCard() {
  return (
    <article className="card">
      <div className="card__image-wrapper">
        <div className="card__controls-wrapper">
          <button className="button button_type_remove" />
          <span className="card__tooltip">Remove from saved</span>
          <span className="card__keyword">Nature</span>
        </div>
        <img className="card__image" src={imgBeach} alt="beach" />
      </div>

      <p className="card__date">November 4, 2020</p>
      <h3 className="card__title">
        Everyone Needs a Special sit spot in Nature
      </h3>
      <p className="card__text">
        Ever since I read Richard Louvs influential book, Last Child in the
        Woods, the idea of having a special sit spot has stuck with me. This
        advice, which Louv attributes to nature educator Jon Young, is for both
        adults and children to find...
      </p>
      <p className="card__source">treehugger</p>
    </article>
  );
}
