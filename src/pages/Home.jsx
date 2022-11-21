/* eslint react/prop-types: 0 */
import React from 'react';
import Header from '../components/Header/Header.jsx';
import Main from '../components/Main/Main.jsx';
import Footer from '../components/Footer/Footer.jsx';

export default function Home({ OnSignInClick }) {
  return (
    <div className="app">
      <Header OnSignInClick={OnSignInClick} />
      <Main />
      <Footer />
    </div>
  );
}
