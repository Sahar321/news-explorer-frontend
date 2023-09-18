/*eslint-disable */
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Textarea from '../Textarea/Textarea.jsx';
import './CommentInput.css';

export default function CommentInput(prop) {
  const { isOpen, onCommentSubmit } = prop;
  const [value, setValue] = React.useState('');
  const handleChange = (evt) => {
    const { value } = evt.target;
    setValue(value);
  };
  const handleOnCommentSubmit = (e) => {
    e.preventDefault();
    onCommentSubmit(value);
  };
  return (
    <form
      onSubmit={handleOnCommentSubmit}
      className={`comment__warper comment__warper_visible_${isOpen}`}
    >
      <Textarea
        name="text"
        id="text"
        maxExpandable="30"
        expandableBy="2"
        expandable={true}
        onChange={handleChange}
        value={value}
        placeholder="Write a comment..."
      />
      <Button
        type="submit"
        width="6px"
        variant="contained"
        className="comment__button"
      >
        <SendIcon />
      </Button>
    </form>
  );
}
