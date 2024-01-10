/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import useSwipe from '../../utils/hooks/useSwipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imageNotAvailable from '../../images/Image_not_available.png';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import top3 from '../../images/test/top3.jpg';
import top2 from '../../images/test/top2.jpg';
import bottm22 from '../../images/test/bottm2.jpg';
import bottm3 from '../../images/test/bottm3.jpg';
import bottm2 from '../../images/test/bottm2.webp';
import bottm1 from '../../images/test/bottm1.jpg';
import './Carousel.css';
export default function Carousel({ data, indexStart = 0 }) {
  const slide = useRef(null);
  const [activeDataSlide, setActiveDataSlide] = useState();
  const [slideIndex, setSlideIndex] = useState(indexStart);
  useEffect(() => {
    if (data.length < slideIndex) {
      slide.current.style.backgroundColor = "red";
      return
    }
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

  const handleForewd = () => {
    moveSlide('right');
  };
  const handleBack = () => {
    moveSlide('left');
  };

  return (
    <div className="carousel">
      <div ref={slide} className="carousel__container">
        <button
          onClick={handleBack}
          className="button carousel__navigation carousel__navigation_left"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={handleForewd}
          className="button carousel__navigation carousel__navigation_right"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <div className="carousel__slide-info">
          <h2 className="carousel__slide-title">{data.title}</h2>

          <p className="carousel__slide-text">{data.text} </p>
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
