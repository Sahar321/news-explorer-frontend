/*eslint-disable */
import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Textarea from '../Textarea/Textarea.jsx';
import './Comment.css';

export default function Comment({ isOpen, onCommentSubmit }) {
  const [value, setValue] = React.useState('');
  const handleChange = (evt) => {
    const { value } = evt.target;
    setValue(value);
  };

  const handleOnCommentSubmit = (e) => {
    e.preventDefault();
    console.log(value);
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
        maxExpandable="8"
        expandableBy="4"
        expandable={true}
        onChange={handleChange}
        value={value}
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
