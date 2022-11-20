/* eslint react/prop-types: 0 */
import React from 'react';
import Header from '../components/Header/Header.jsx';
import Main from '../components/Main/Main.jsx';
import Footer from '../components/Footer/Footer.jsx';

export default function Home({ loggedIn }) {
  console.log(loggedIn);
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
