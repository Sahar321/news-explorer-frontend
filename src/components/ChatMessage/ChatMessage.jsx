/*eslint-disable*/
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import ReportIcon from '@mui/icons-material/Report';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import userAvatar from '../../images/icons/user_avatar.svg';
import { DateTime } from 'luxon';
import './ChatMessage.css';
import Userbox from '../Userbox/Userbox';

export default function ChatMessage({ comment, index }) {
  const [commentData, setCommentData] = useState(formatComment(comment));

  function formatComment({ text, username, rating, date, avatar }) {
    const formattedDate = DateTime.fromISO(date, { zone: 'utc' }).toFormat(
      'dd/MM/yyyy HH:mm'
    );
    return {
      index,
      text,
      username,
      rating,
      date: formattedDate,
      avatar,
    };
  }

  useEffect(() => {
    setCommentData(formatComment(comment));
  }, [comment]);

  return (
    <div key={commentData.index} className="">
      <Userbox username={commentData.username} avatar={commentData.avatar}>
        <p>{commentData.text}</p>
      </Userbox>
      <div className="chat-message__buttons-warper">
        <IconButton aria-label="Reply" title="Reply">
          <ReplyIcon />
        </IconButton>
        <IconButton aria-label="Report" title="Report">
          <ReportIcon />
        </IconButton>
        <IconButton aria-label="Edit" title="Edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Delete" title="Delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
