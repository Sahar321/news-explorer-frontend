// useAppStyles.js
/* eslint-disable*/
import { Select } from '@mui/material';
import { useState, useEffect } from 'react';

function useAppStyles() {
  const [appStyles, setAppStyles] = useState('');
  const [headerStyles, setHeaderStyles] = useState('');

  useEffect(() => {
    const { pathname } = window.location;

    switch (pathname) {
      case '/':
        setAppStyles('');
        setHeaderStyles('header_page_home');
        break;
      case '/SavedArticles':
      case '/profile':
      case '/profile/comments':
      case '/profile/reactions':
        setAppStyles('app_page_saved-articles');
        setHeaderStyles('header_page_saved-articles');

        break;
      default:
        break;
    }

    return () => {
      setAppStyles(''); // Reset appStyle
      setHeaderStyles(''); // Reset headerStyle
    };
  }, [window.location.pathname]);

  return [appStyles, headerStyles];
}

export default useAppStyles;
