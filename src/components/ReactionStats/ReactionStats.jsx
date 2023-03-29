/*eslint-disable */
import React, { useEffect, useState } from 'react';
import totalPostIcon from '../../images/icons/totalpost.png';
import thankyouIcon from '../../images/icons/thankyouIcon.png';
import './ReactionStats.css';

export default function ReactionStats(data) {
  const { reactionId, totalThankYouCount, totalPostCount } = data;
  const [statsDate, setStatsDate] = useState(data);

  function formatNumber(num) {
    const formattingRules = {
      T: 1000000000000000000,
      B: 1000000000000,
      M: 1000000,
      K: 1000,
    };
    Object.entries(formattingRules).forEach(([suffix, value]) => {
      if (num >= value) {
        var formattedNum = (num / value).toFixed(1) + suffix;
        return formattedNum;
      }
    });

    return num;
  }

  const formatData = (data) => {};

  useEffect(() => {

    setStatsDate(formatData(data));
  }, [data]);

  return (
    <>
      <div className="reaction-stats">
        <img
          src={totalPostIcon}
          className="popup__reaction__count-icon"
          alt=""
        />
        <span className="reaction-stats__total-count">30h+</span>
      </div>
      <div className="reaction-stats na">
        <img
          src={thankyouIcon}
          className="popup__reaction__count-icon"
          alt=""
        />
        <span className="reaction-stats__total-count">30h+</span>
      </div>
      <i
        className={`icon reaction-stats__reaction icon_reaction_${reactionId?.toLowerCase()}`}
      ></i>
    </>
  );
}
