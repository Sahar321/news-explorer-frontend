import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import About from '../About/About.jsx';
import NewsCardList from '../NewsCardList/NewsCardList.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import SearchPreloader from '../SearchPreloader/SearchPreloader.jsx';
import './Main.css';

export default function Main() {
  // should be to removed:
  // reviewer: Please, add some logic to the page to display "Preloader" and "Nothing found"
  const [displayComponent, setDisplayComponent] = useState(<NewsCardList showTitle={true} />);
  const handleSearchSubmit = () => {
    setDisplayComponent(<SearchPreloader />);
    setTimeout(() => {
      setDisplayComponent(<NotFound />);
    }, 2500);
  };
  return (
    <main className="main">
      <div className="main__heading">
        <h1 className="main__title"> What&apos;s going on in the world?</h1>
        <p className="main__subtext">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm onSearchSubmit={handleSearchSubmit} />
      </div>

      {displayComponent}
      <About />
    </main>
  );
}
