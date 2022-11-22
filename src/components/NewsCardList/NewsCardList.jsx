import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.jsx';

export default function NewsCardList() {
  return (
    <section className="NewsCardList">
      <h2 className="NewsCardList__text-results">Search results</h2>
        <div className="NewsCardList__card-container">
          <NewsCard />
          <NewsCard />
          <NewsCard />

        </div>
        <button type="button" className='button button__show-more'>Show More</button>
    </section>
  );
}