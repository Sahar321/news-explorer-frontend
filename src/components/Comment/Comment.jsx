import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Textarea from '../Textarea/Textarea.jsx';
import './Comment.css';

export default function Comment({ isOpen }) {
  return (
    <div className={`comment__warper comment__warper_visible_${isOpen}`}>
      <Textarea maxExpandable="8" expandableBy="4" expandable={true} />
      <Button width="6px" type="submit" variant="contained" className="comment__button">
        <SendIcon />
      </Button>
    </div>
  );
}
