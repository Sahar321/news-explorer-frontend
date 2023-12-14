/*eslint-disable*/
import React, { useState, useEffect, forwardRef, useRef } from 'react';
import './SaveOrRemoveButton.css';
import CardType from '../../constants/enums/CardType';
import Button from '@mui/material/Button';

export default function SaveOrRemoveButton({
  onRemoveClick,
  onSaveClick,
  isSaved,
  loggedIn,
  type,
}) {
  const isBookmarkActiveClass = isSaved ? 'button__bookmark_type_active' : '';
  const isBookmarkDisabledClass = !loggedIn
    ? 'button__bookmark_type_disabled'
    : '';



  return (
    <>
      {type === CardType.REMOVE && (
        <>
          <button
            aria-label="remove Card"
            className="button button_type_remove card__button"
            onClick={onRemoveClick}
          />
          <span className="card__tooltip">Remove from saved</span>{' '}
        </>
      )}

      {type === CardType.BOOKMARK && (
        <>
          <button
            aria-label="bookmark Card"
            className={`button button__bookmark card__button  ${
              isBookmarkActiveClass + isBookmarkDisabledClass
            }`}
            onClick={onSaveClick}
          />
          {!loggedIn && (
            <span className="card__tooltip">Sign in to save articles</span>
          )}
        </>
      )}
    </>
  );
}
