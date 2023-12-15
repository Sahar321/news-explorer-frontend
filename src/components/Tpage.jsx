/*eslint-disable*/
import React from 'react';
import useSwipe from '../utils/hooks/useSwipe.js';
import NewsCard from './NewsCard/NewsCard.jsx';
import './TPage.css';
export default function Tpage({ className, isVisible }) {
  const data = {
    title:
      'Birincisi bildiğimiz gibi: Türkiye’de en çok kullanılan şifreler belli oldu!',
    date: '19:50 16/11/23',
    source: 'Shiftdelete.net',
    keyword: 'ASDASD',
    link: 'https://shiftdelete.net/dunya-turkiye-en-cok-kullanilan-sifre-2023',
    image:
      'https://ares.shiftdelete.net/2023/11/dunya-turkiye-en-cok-kullanilan-sifre-2023-KAPAK-min.jpg',
    text: 'Bu içerik ilk olarak Birincisi bildiğimiz gibi: Türkiye’de en çok kullanılan şifreler belli oldu! adresinde yayınlandı Teknoloji Haberleri - ShiftDelete.Net.',
  };
  return <NewsCard cardData={data} />;
}
