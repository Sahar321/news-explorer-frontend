/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import useSwipe from '../../utils/hooks/useSwipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imageNotAvailable from '../../images/Image_not_available.png';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import './Carousel.css';
import { set } from 'animejs';
export default function Carousel({ data, indexStart }) {
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    minSwipeDistance: 80,
    onSwipeLeft: () => handleBack(),
    onSwipeRight: () => handleForward(),
  });
  const slide = useRef(null);


  const [activeDataSlide, setActiveDataSlide] = useState();

  const [slideIndex, setSlideIndex] = useState(indexStart);
  useEffect(() => {
    console.log(data.length);
    console.log(indexStart);
    if (data.length < indexStart) {
      setSlideIndex(data.length - 1);
      return;
    }
    if (indexStart <= 0) {
      setSlideIndex(0);
      return;
    }
  }, [indexStart]);

  useEffect(() => {
    if (data.length < slideIndex) {
      slide.current.style.backgroundColor = 'red';
      return;
    }
    console.log(slideIndex);
    setActiveDataSlide(data[slideIndex]);
  }, [data, slideIndex]);
  useEffect(() => {
    const url = activeDataSlide?.image;
    if (url) {
      slide.current.style.backgroundImage = `url(${url})`;
    } else {
      slide.current.style.backgroundImage = `url(${imageNotAvailable})`;
    }
  }, [activeDataSlide]);

  const moveSlide = (direction) => {
    switch (direction) {
      case 'right':
        setSlideIndex((index) => index + 1);
        break;
      case 'left':
        setSlideIndex((index) => index - 1);
        break;
      default:
        break;
    }
  };

  const handleForward = () => {
    moveSlide('right');
  };
  const handleBack = () => {
    moveSlide('left');
  };

  return (
    <div
      className="carousel"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div ref={slide} className="carousel__container">
        <button
          onClick={handleBack}
          className="button carousel__navigation carousel__navigation_left"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={handleForward}
          className="button carousel__navigation carousel__navigation_right"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <div className="carousel__slide-info">
          <h2 className="carousel__slide-title">{activeDataSlide?.title}</h2>

          <p className="carousel__slide-text">{activeDataSlide?.text} </p>
        </div>
        {/*       <div className="carousel__items">
        <img className="carousel__item" src={data.image1} alt="carousel item" />
        <img className="carousel__item" src={data.image2} alt="carousel item" />
        <img className="carousel__item" src={data.image3} alt="carousel item" />
        <img className="carousel__item" src={data.image4} alt="carousel item" />
      </div> */}
      </div>
    </div>
  );
}
