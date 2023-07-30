/*eslint-disable */
import React, { useEffect, useState } from 'react';
import totalPostIcon from '../../images/icons/totalpost.png';
import thankyouIcon from '../../images/icons/thankyouIcon.png';
import {formatNumberWithLetterShortcut} from '../../utils/helpers';
import './ReactionStats.css';

export default function ReactionStats({ stats }) {
  const { reactionId } = stats;
  const [totalComments, setTotalComments] = useState(0);
  const [totalThankYou, setTotalThankYou] = useState(0);



  useEffect(() => {
    const comments = formatNumberWithLetterShortcut(stats.totalComments);
    const thankYou = formatNumberWithLetterShortcut(stats.totalThankYou);
    setTotalComments(comments);
    setTotalThankYou(thankYou);
  }, [stats]);
  return (
    <>
      <div className="reaction-stats reaction-stats_type_comment-count">
        <img
          src={totalPostIcon}
          className="popup__reaction__count-icon"
          alt=""
        />
        <span className="reaction-stats__total-count">{totalComments}</span>
      </div>
      <div className="reaction-stats reaction-stats_type_thank-you">
        <img
          src={thankyouIcon}
          className="popup__reaction__count-icon"
          alt=""
        />
        <span className="reaction-stats__total-count">{totalThankYou}</span>
      </div>
      <i
        className={`icon reaction-stats__reaction icon_reaction_${reactionId?.toLowerCase()}`}
      ></i>
    </>
  );
}
