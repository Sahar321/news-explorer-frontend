/*eslint-disable   */

import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import ReactionType from '../../constants/enums/ReactionType';
import './ReactionsList.css';

export default function ReactionsList({
  reactionsCountByType,
  onUniqueReactionsClick,
  classList,
}) {



  return (
    <div className={`reactions__list ${classList}`}>
      {Object.entries(reactionsCountByType).map(([type, count]) => (
        <button
          key={type}
          aria-label={`${type} count`}
          className="button button_type_reaction-item"
          onClick={onUniqueReactionsClick}
        >
          <span className="reactions__count">{count}</span>

          <i
            className={`icon icon-reaction icon_reaction_${type.toLowerCase()}`}
          ></i>
        </button>
      ))}
    </div>
  );
}
