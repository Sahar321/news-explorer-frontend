import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import SavedNews from '../SavedNews/SavedNews.jsx';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
//    <button type="button" className="button button_type_show-more">Show More</button>
//  <button type="button" className="button button-bookmark button-bookmark_state_marked"></button>
