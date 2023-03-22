/*eslint-disable   */

import React from 'react';
import Button from '@mui/material/Button';
import ReactionType from '../../constants/enums/ReactionType';
import './ReactionsList.css';

export default function ReactionsList({ reactions }) {
  console.log('ReactionsList', reactions);
  // Create a map to count the number of times each reaction appears
  if (!reactions) {
    return null;
  }
  const reactionCounts = reactions.reduce((map, { reactionId }) => {
    map[reactionId] = (map[reactionId] || 0) + 1;
    return map;
  }, {});

  // Create an array of unique reaction IDs
  const uniqueReactions = Object.keys(reactionCounts);

  return (
    <div className="reactions__list">
      {uniqueReactions?.map((reactionId) => (
        <button
          key={reactionId}
          aria-label={`${reactionId} count`}
          className="button button_type_reaction-item"
        >
          <span className='reactions__count'> {reactionCounts[reactionId]}</span>

          <i
            className={`icon icon-reaction icon_reaction_${reactionId.toLowerCase()}`}
          ></i>
        </button>
        /*  <button className='button reactions__button' key={reactionId}>
          <img className='reactions__icon' src={ReactionType[reactionId]} alt={reactionId}></img>
          {reactionCounts[reactionId]}
        </button> */
      ))}
    </div>
  );
}
