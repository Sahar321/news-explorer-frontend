/* eslint-disable*/
import React, { useEffect, useRef } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import SearchPreloader from '../SearchPreloader/SearchPreloader.jsx';
import About from '../About/About.jsx';
import CardType from '../../constants/enums/CardType';
import NewsCardList from '../NewsCardList/NewsCardList.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import SearchSection from '../SearchSection/SearchSection.jsx';
import SearchCards from '../SearchCards/SearchCards.jsx';
import Carousel from '../Carousel/Carousel.jsx';
import './Main.css';

export default function Main({
  cardsToShow,
  loggedIn,
  onCardBookmarkClick,
  onSearchSubmit,
  onShowMoreClick,
  cards,
  isSearchPreloaderVisible,
  isSearchNotFoundVisible,
  bookmarkCards,
  onReactionSelect,
  onCommentClick,
  onUniqueReactionsClick,
  onRemoveReaction,
  onCardShare,
}) {
  const hasCardsToShow = cardsToShow.length > 0;
  const notFoundrRef = useRef(null);
  useEffect(() => {
    if (isSearchNotFoundVisible) {
      notFoundrRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      console.log('scroll');
    }
  }, [isSearchNotFoundVisible]);
  const SearchSectionRef = useRef(null);
  return (
    <main className="main">
      <SearchSection
        ref={SearchSectionRef}
        cls={`${hasCardsToShow && 'StartAnimation'}`}
        title="What's going on in the world?"
        text="Find the latest news on any topic and save them in your personal
        account."
      >
        <SearchForm onSearchSubmit={onSearchSubmit} />
      </SearchSection>
      <NotFound
        ref={notFoundrRef}
        id="test"
        isVisible={isSearchNotFoundVisible}
      />
      <SearchPreloader isVisible={isSearchPreloaderVisible} />

      {hasCardsToShow && (
        <>
          {/*           <h2 className={'card-list__search-results'}>Search results</h2> */}
          {hasCardsToShow && (
            <>
              <SearchCards onSearchSubmit={onSearchSubmit} />
              <Carousel data={cards} />
            </>
          )}
          <NewsCardList
            loggedIn={loggedIn}
            showTitle={true}
            cards={cards}
            showKeyword={false}
            cardType={CardType.BOOKMARK}
            cardsToShow={cardsToShow}
            onShowMoreClick={onShowMoreClick}
            pageClassName="card-list__cards-wrapper_page_home"
            onCardBookmarkClick={onCardBookmarkClick}
            onRemoveReaction={onRemoveReaction}
            bookmarkCards={bookmarkCards}
            onReactionSelect={onReactionSelect}
            onCommentClick={onCommentClick}
            onUniqueReactionsClick={onUniqueReactionsClick}
            onCardShare={onCardShare}
          />
        </>
      )}
      <About />
    </main>
  );
}
