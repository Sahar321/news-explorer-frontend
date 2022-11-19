import React from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import About from '../About/About.jsx';
import './Main.css';

export default function Main() {
  return (
    <main className="main">
      <h1 className="main__title"> What&apos;s going on in the world?</h1>
      <p className="main__subtext">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm />
      <About />
    </main>
  );
}
