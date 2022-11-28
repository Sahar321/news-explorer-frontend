import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.jsx';

export default function NewsCardList({ showTitle }) {
  return (
    <section className="card-list">
      <h2 className={`card-list__search-results card-list__text-search_isVisible_${showTitle}`}>
        Search results
      </h2>
      <div className="card-list__cards-wrapper card-list__cards-wrapper_page_saved-articles">
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
      <button type="button" className="button button__show-more">
        Show More
      </button>
    </section>
  );
}
