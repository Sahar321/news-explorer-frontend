/*eslint-disable */
import React, { useEffect, useContext, useState } from 'react';
import NewsCardList from '../components/NewsCardList/NewsCardList.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardType from '../constants/enums/CardType';

export default function SavedArticles({
  setAppStyles,
  savedCards,
  onCardRemoveClick,
  onUniqueReactionsClick,
  onReactionSelect,
  onCardShare,
  onCommentClick,
  onRemoveReaction,
}) {
  const currentUser = useContext(CurrentUserContext);
  const keywords = [];
  const [keywordText, setKeywordText] = useState('');

  useEffect(() => {
    setAppStyles('app_page_saved-articles');
    return () => {
      setAppStyles('');
    };
  }, []);
  useEffect(() => {
    savedCards.forEach((card) => {
      if (!keywords.includes(card.keyword)) {
        keywords.push(card.keyword);
      }
    });
  }, [savedCards]);
  useEffect(() => {
    const { length } = keywords;
    if (length === 1) {
      setKeywordText(`${keywords[0]}`);
    } else if (length === 2) {
      setKeywordText(`${keywords[0]}, ${keywords[1]}`);
    } else if (length >= 3) {
      setKeywordText(
        `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} others`
      );
    }
  }, [keywords]);
  return (
    <>
      <section className="saved-articles">
        <span className="saved-articles__title">Saved articles</span>
        <h1 className="saved-articles__text">
          {savedCards.length > 0
            ? `${currentUser.name}, you have ${savedCards.length} saved articles`
            : `Hey ${currentUser.name}, You haven't saved any articles yet. Give it a try!`}
        </h1>

        {savedCards.length > 0 && (
          <h2 className="saved-articles__keywords">
            By keywords: <strong>{keywordText}</strong>
          </h2>
        )}
      </section>

      {savedCards.length > 0 && (
        <NewsCardList
          pageClassName="card-list__cards-wrapper_page_saved-articles"
          cardType={CardType.REMOVE}
          cardsToShow={savedCards}
          showKeyword={true}
          onCardRemoveClick={onCardRemoveClick}
          onUniqueReactionsClick={onUniqueReactionsClick}
          onReactionSelect={onReactionSelect}
          onCardShare={onCardShare}
          onCommentClick={onCommentClick}
          onRemoveReaction={onRemoveReaction}
        />
      )}
    </>
  );
}
