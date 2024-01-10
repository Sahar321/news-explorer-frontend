/*eslint-disable*/
import React, { forwardRef } from 'react';
import './NotFound.css';

const NotFound = forwardRef((props, ref) => {
  const { isVisible } = props;

  return (
    <>
      {isVisible && (
        <div className="not-found" ref={ref}>
          <i className="not-found__icon"></i>
          <h3 className="not-found__title">Nothing found</h3>
          <span className="not-found__text">
            Sorry, but nothing matched
            <br />
            your search terms.
          </span>
        </div>
      )}
    </>
  );
});

export default NotFound;