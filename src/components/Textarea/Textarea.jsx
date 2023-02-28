/*eslint-disable */
import React from 'react';
import './Textarea.css';

export default function Textarea({
  expandable = false,
  expandableBy = 3,
  maxExpandable = 20,
  value,
  onChange,
}) {
  const textareaClassName = `popup__input comment__input`;

  const getRows = () => {
    const lineCount =
      (value.match(/\n/g) || []).length + parseInt(expandableBy);
    return Math.min(lineCount, maxExpandable);
  };

  return (
    <textarea
      value={value}
      rows={expandable ? getRows() : 4}
      className={textareaClassName}
      onChange={onChange}
    />
  );
}
