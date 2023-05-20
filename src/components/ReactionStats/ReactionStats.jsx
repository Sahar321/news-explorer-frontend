/*eslint-disable */
import React, { useEffect, useState } from 'react';
import totalPostIcon from '../../images/icons/totalpost.png';
import thankyouIcon from '../../images/icons/thankyouIcon.png';
import './ReactionStats.css';

export default function ReactionStats({ stats }) {
  const { reactionId } = stats;
  const [totalComments, setTotalComments] = useState(0);
  const [totalThankYou, setTotalThankYou] = useState(0);

  /*   const formatUserStatsData = (stats) => {
console.log(stats);
  };
 */
  function formatNumberWithLetterShortCut(number) {
    const letterNumberShortcut = {
      K: 1000,
      M: 1000000,
      B: 1000000000,

    };

    for (const [key, value] of Object.entries(letterNumberShortcut)) {
      if (number >= value) {
        return `${(number / value).toFixed(1)}${key}+ `;
      }
    }

    return number.toString();
  }
  function formatNumberWithLetterShortcut(number) {
    const abbreviations = [
      { value: 1e12, symbol: 'Holy Moses' },
      { value: 1e9, symbol: 'B' },
      { value: 1e6, symbol: 'M' },
      { value: 1e3, symbol: 'K' },
    ];

    for (let i = 0; i < abbreviations.length; i++) {
      if (number >= abbreviations[i].value) {
        const scaledNumber = number / abbreviations[i].value;
        const formattedNumber = scaledNumber.toFixed(1);
        return formattedNumber + abbreviations[i].symbol +"+";
      }
    }

    // if the number is smaller than 1000, return it as is
    return number.toString();
  }

  useEffect(() => {
    const comments = formatNumberWithLetterShortcut(stats.totalComments);
    const thankYou = formatNumberWithLetterShortcut(stats.totalThankYou);
    setTotalComments(comments);
    setTotalThankYou(thankYou);
  }, [stats]);
  return (
    <>
      <div className="reaction-stats">
        <img
          src={totalPostIcon}
          className="popup__reaction__count-icon"
          alt=""
        />
        <span className="reaction-stats__total-count">{totalComments}</span>
      </div>
      <div className="reaction-stats na">
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
