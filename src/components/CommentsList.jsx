/*eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import ChatMessage from './ChatMessage/ChatMessage';
const CommentsList = ({ comments, onThankYou }) => {
  const renderRow = ({ index, style }) => {
    const comment = comments[comments?.length - index - 1];


    return (
      <div style={style}>
        <ChatMessage
          id={index}
          index={comments?.length - index}
          comment={comment}
          onThankYou={onThankYou}
        />
      </div>
    );
  };

  return (
    <List
      height={parseInt(500)} // Adjust this value according to your layout
      itemCount={comments?.length}
      itemSize={145} // Average height of a single comment. Adjust as needed.
      width="100%"
    >
      {renderRow}
    </List>
  );
};

export default CommentsList;
