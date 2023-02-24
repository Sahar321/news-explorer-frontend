import React from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import SearchPreloader from '../SearchPreloader/SearchPreloader.jsx';
import About from '../About/About.jsx';
import CardType from '../../constants/enums/CardType';
import NewsCardList from '../NewsCardList/NewsCardList.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import SearchSection from '../SearchSection/SearchSection.jsx';
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
}) {
  const hasCardsToShow = cardsToShow.length > 0;
  return (
    <main className="main">
      <SearchSection
        title="What's going on in the world?"
        text="Find the latest news on any topic and save them in your personal
        account."
      >
        <SearchForm onSearchSubmit={onSearchSubmit} />
      </SearchSection>
      <NotFound isVisible={isSearchNotFoundVisible} />
      <SearchPreloader isVisible={isSearchPreloaderVisible} />

      {hasCardsToShow && (
        <>
          <h2 className={'card-list__search-results'}>Search results</h2>
          <NewsCardList
            onCardBookmarkClick={onCardBookmarkClick}
            loggedIn={loggedIn}
            showTitle={true}
            cards={cards}
            showKeyword={false}
            cardType={CardType.BOOKMARK}
            cardsToShow={cardsToShow}
            onShowMoreClick={onShowMoreClick}
            bookmarkCards={bookmarkCards}
            pageClassName="card-list__cards-wrapper_page_home"
            onReactionSelect={onReactionSelect}
            onCommentClick={onCommentClick}
          />
        </>
      )}
      <About />
    </main>
  );
}
