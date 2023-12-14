/*eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';

function ExpandableTitle({ title, classList }) {
  const titleRef = useRef(null);
  const [isTitleOverflow, setIsTitleOverflow] = useState(false);
  const [isTitleOverflowVisible, setIsTitleOverflowVisible] = useState(false);

  useEffect(() => {
    if (!titleRef.current || !title) return;
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [title]);

  const checkOverflow = () => {
    const titleHeight = titleRef.current.offsetHeight;
    const titleScrollHeight = titleRef.current.scrollHeight;
    if (titleHeight + 4 < titleScrollHeight) {
      setIsTitleOverflow(true);
    } else {
      setIsTitleOverflow(false);
    }
  };

  const toggleExpandTitle = () => {
    setIsTitleOverflowVisible(!isTitleOverflowVisible);
  };

  return (
    <>
      <h3
        ref={titleRef}
        dir="auto"
        className={`card__title ${classList?.title ? classList.title : ''} ${
          isTitleOverflowVisible && 'card__title_overflow'
        }`}
      >
        {title}
      </h3>
      {isTitleOverflow && (
        <FontAwesomeIcon
          onClick={toggleExpandTitle}
          className={`chevron ${!isTitleOverflowVisible && 'chevron_type_up'}`}
          icon={faCircleChevronUp}
        />
      )}
    </>
  );
}

export default ExpandableTitle;
