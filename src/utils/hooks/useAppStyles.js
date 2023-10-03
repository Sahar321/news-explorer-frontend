// useAppStyles.js
/* eslint-disable*/
import { Select } from '@mui/material';
import { useState, useEffect } from 'react';

function useAppStyles() {
  const [appStyles, setAppStyles] = useState('');
  const [headerStyles, setHeaderStyles] = useState('');
  const [appMenuStyle, setAppMenuStyle] = useState('');
  const [appMobileMenuStyle, setAppMobileMenuStyle] = useState('');
  useEffect(() => {
    const { pathname } = window.location;

    switch (pathname) {
      case '/':
        setAppStyles('');
        setHeaderStyles('header_page_home');
        setAppMenuStyle('bg-white');
        setAppMobileMenuStyle('bg-grayBlack');
        break;
      case '/SavedArticles':
      case '/profile':
      case '/profile/comments':
      case '/profile/reactions':
        setAppStyles('app_page_saved-articles');
        setHeaderStyles('header_page_saved-articles');
        setAppMenuStyle('bg-black');
        setAppMobileMenuStyle('bg-white');
        break;
      default:
        break;
    }

    return () => {
      setAppStyles('');
      setHeaderStyles('');
      setAppMenuStyle('');
      setAppMobileMenuStyle('');
    };
  }, [window.location.pathname]);

  return {appStyles, headerStyles, appMenuStyle, appMobileMenuStyle};
}

export default useAppStyles;
