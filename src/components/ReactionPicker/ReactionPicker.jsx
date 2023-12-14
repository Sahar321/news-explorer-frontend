/*eslint-disable*/
import React, { useState, useEffect, forwardRef, useRef } from 'react';
import useClickOutside from '../../utils/hooks/useClickOutside';
import ReactionType from '../../constants/enums/ReactionType';
import Button from '@mui/material/Button';
import AddReactionIcon from '@mui/icons-material/AddReaction';

import './ReactionPicker.css';

export default function ReactionPicker({
  isOpen,
  reaction,
  onReactionSelect,
  onRemoveReaction,
  onUniqueReactionsClick,
}) {
  const [isReactionsOpen, setIsReactionsOpen] = React.useState(false);
  const [selectedReaction, setSelectedReaction] = React.useState(null);
  const reactionsRef = useRef(null);

  useEffect(() => {
    if (reaction) {
      setSelectedReaction(ReactionType[reaction]);
    } else {
      setSelectedReaction(null);
    }
  }, [reaction]);

  useEffect(() => {
    setIsReactionsOpen(isOpen);
  }, [isOpen]);

  useClickOutside(reactionsRef, isReactionsOpen, () => {
    console.log('click outssadaside');
    setIsReactionsOpen(false);
  });

  const handleReactionsClick = (evt) => {
    if (!evt.target.id) return;
    setIsReactionsOpen(!isReactionsOpen);

    onReactionSelect({ type: evt.target.id });
  };

  const toggleReactionsOpen = () => {
    setIsReactionsOpen(!isReactionsOpen);
  };
  const handleRemoveReaction = () => {
    setIsReactionsOpen(false);
    onRemoveReaction();
  };

  return (
    <div className="reactions" ref={reactionsRef}>
      <Button onClick={toggleReactionsOpen}>
        {selectedReaction ? (
          <img width="30px" src={selectedReaction} />
        ) : (
          <AddReactionIcon />
        )}
      </Button>

      <div
        onClick={handleReactionsClick}
        className={`reactions__emojis-container reactions_visible_${isReactionsOpen}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="reactions__icon-remove"
          width="40"
          height="40"
          fill="currentColor"
          onClick={handleRemoveReaction}
        >
          <path
            fill="currentColor"
            d="m22.357 20 8.821 8.821-2.357 2.357L18.35 20.707a1 1 0 0 1 0-1.414L28.82 8.82l2.357 2.357L22.357 20Z"
          />
          <path
            fill="currentColor"
            d="M18.13 20 9.31 28.82l2.356 2.357 10.472-10.471a1 1 0 0 0 0-1.414L11.666 8.82 9.31 11.178 18.131 20Z"
          />
        </svg>
        <img
          alt="lol"
          id="LOL"
          width="30px"
          className="reaction__icon-select animate__animated animate__bounceIn"
          src={ReactionType['LOL']}
        />
        <img
          alt="wow"
          id="WOW"
          width="30px"
          className="reaction__icon-select animate__animated animate__bounceIn"
          src={ReactionType['WOW']}
        />
        <img
          alt="LIKE"
          id="LIKE"
          width="30px"
          className="reaction__icon-select animate__animated animate__bounceIn"
          src={ReactionType['LIKE']}
        />
        <img
          alt="SAD"
          id="SAD"
          width="30px"
          className="reaction__icon-select animate__animated animate__bounceIn"
          src={ReactionType['SAD']}
        />
        <img
          alt="love"
          id="LOVE"
          width="30px"
          className="reaction__icon-select animate__animated animate__bounceIn"
          src={ReactionType['LOVE']}
        />
      </div>
    </div>
  );
}
