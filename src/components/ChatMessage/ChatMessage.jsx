/*eslint-disable*/
import { Button } from '@mui/material';
import React from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import ReportIcon from '@mui/icons-material/Report';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import userAvatar from '../../images/icons/user_avatar.svg';
import './ChatMessage.css';

export default function ChatMessage({ comment, index }) {
  const { text, owner, date, rating } = comment;
  const newDate = new Date(date);
  const formattedDate = `${newDate.getDate().toString().padStart(2, '0')}/${(
    newDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${newDate
    .getFullYear()
    .toString()
    .slice(-2)} ${newDate.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  return (
    <div className="chat-message__warper">
      <div className="chat-message__author-Info">
        <img
          src={userAvatar}
          alt="avatar"
          className="chat-message__avatar"
        ></img>
        <label className="chat-message__author">{owner}</label>
        <label className="chat-message__date">{formattedDate}</label>
        <label className="chat-message__number">{`#${index}`}</label>
      </div>
      <div className="chat-message__message-warper">
        <p className="chat-message__text">{text}</p>
        <label className="chat-message__replayTo">respond to Sahar Moshe</label>
      </div>
      <div className="chat-message__buttons-warper">
        <Button>
          <ReplyIcon />
        </Button>
        <Button>
          <ReportIcon />
        </Button>
        <Button>
          <EditIcon />
        </Button>
        <Button>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
}
