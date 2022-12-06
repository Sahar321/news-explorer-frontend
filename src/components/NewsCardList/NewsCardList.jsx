import React from 'react';
import { useLocation } from 'react-router-dom';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.jsx';

export default function NewsCardList() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const selectedPage = isHomePage ? 'home' : 'saved-articles';

  return (
    <section className="card-list">
      <h2
        className={`card-list__search-results card-list__search-results_isVisible_${isHomePage}`}
      >
        Search results
      </h2>
      <div
        className={`card-list__cards-wrapper card-list__cards-wrapper_page_${selectedPage}`}
      >
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
      {isHomePage && (
        <button type="button" className="button button__show-more">
          Show more
        </button>
      )}
    </section>
  );
}
