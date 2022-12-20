import React, { useEffect } from 'react';
import NewsCardList from '../components/NewsCardList/NewsCardList.jsx';

export default function SavedArticles() {
  // const [loggedIn, setLoggedIn] = React.useState(false);
  useEffect(() => {
    const app = document.querySelector('.app');
    app.classList.add('app_page_saved-articles');
    return () => {
      app.classList.remove('app_page_saved-articles');
    };
  }, []);
  return (
    <>
      <section className="saved-articles">
        <span className="saved-articles__title">Saved articles</span>
        <h1 className="saved-articles__text">Elise, you have 5 saved articles</h1>
        <h2 className='saved-articles__keywords'>By keywords: <strong>Nature, Yellowstone, and 2 other</strong></h2>
      </section>

      <NewsCardList />
    </>
  );
}
