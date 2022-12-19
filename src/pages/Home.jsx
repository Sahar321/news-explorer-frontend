import React from 'react';
import Main from '../components/Main/Main.jsx';

export default function Home({ onSearchSumbit }) {
  return (
    <>
      <Main onSearchSumbit={onSearchSumbit} />
    </>
  );
}
