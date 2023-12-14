/*eslint-disable   */

import React, { useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import ReactionType from '../../constants/enums/ReactionType';
import useClickOutside from '../../utils/hooks/useClickOutside';

import './ReactionBadge.css';

export default function ReactionBadge({
  reactionsCountByType,
  onUniqueReactionsClick,
  classList,
}) {
  const reactionListRef = useRef(null);
  const [hasReactions, setHasReactions] = React.useState(false);

  useEffect(() => {
    setHasReactions(Object.keys(reactionsCountByType).length > 0);
  }, [reactionsCountByType]);


  return (
    <>
      {hasReactions && (
        <div ref={reactionListRef} className={`reactions__list ${classList}`}>
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
      )}
    </>
  );
}
