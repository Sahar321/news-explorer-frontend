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
    <article className="NewsCard">
      <div className="NewsCard__image-container">
        <div className="newsCard__buttons-wrapper">
          <button className="button button_type_remove" />
          <button className="button newsCard__tooltip">Remove from saved</button>
          <span className="newsCard__keyword">Nature</span>
        </div>
        <img className="NewsCard__image" src={imgBeach} alt="beach" />
      </div>
      <div className="NewsCard__text-container">
        <p className="NewsCard__date">November 4, 2020</p>
        <h3 className="NewsCard__title">
          Everyone Needs a Special sit spot in Nature
        </h3>
        <p className="NewsCard__text">
          Ever since I read Richard Louvs influential book, Last Child in the
          Woods, the idea of having a special sit spot has stuck with me. This
          advice, which Louv attributes to nature educator Jon Young, is for
          both adults and children to find...
        </p>
        <p className="NewsCard__source">treehugger</p>
      </div>
    </article>
  );
}
