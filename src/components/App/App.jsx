/* eslint no-unused-vars: 0 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import SavedNews from '../SavedNews/SavedNews.jsx';

import Home from '../../pages/Home.jsx';
import SavedArticles from '../../pages/SavedArticles.jsx';
import NotFound from '../../pages/NotFound.jsx';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (<>
 <PopupWithForm />
    <Routes>
      <Route path="/" element={<Home loggedIn={loggedIn} />} />
      <Route path="/SavedArticles" element={<SavedArticles />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
     </>
  );
}
//    <button type="button" className="button button_type_show-more">Show More</button>
//  <button type="button" className="button button-bookmark button-bookmark_state_marked"></button>
