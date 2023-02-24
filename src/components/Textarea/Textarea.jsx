/*eslint-disable */
import React, { useState } from 'react';
import './Textarea.css';

export default function Textarea({
  expandable = false,
  expandableBy = 3,
  maxExpandable = 20,
}) {
  const [value, setValue] = useState('');
  const textareaClassName = `popup__input comment__input`;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const getRows = () => {
    const lineCount = (value.match(/\n/g) || []).length + parseInt(expandableBy);
    return Math.min(lineCount, maxExpandable);
  };

  return expandable ? (
    <textarea
      rows={getRows()}
      value={value}
      onChange={handleChange}
      className={textareaClassName}
    />
  ) : (
    <textarea
      value={value}
      onChange={handleChange}
      className={textareaClassName}
    />
  );
}
