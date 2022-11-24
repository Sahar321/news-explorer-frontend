import React, { useEffect } from 'react';

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
      <h1>Saved Articles</h1>
    </>
  );
}
