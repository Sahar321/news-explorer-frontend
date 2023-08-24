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
import thankyouIcon from '../../images/icons/thankyouIcon.png';
export default function ChatMessage({ cardData, comment, index, onThankYou, id}) {
  const [commentData, setCommentData] = useState({});

/*  */
  useEffect(() => {
    setCommentData(formatComment(comment));
  }, [comment]);

  const handleOnThankYou = () => {
    const thankYouData = {
      id: commentData.id,
      toOwner: commentData.owner,
    };

    onThankYou(thankYouData);
  };

  function formatComment({ text, rating, date, owner, user }) {
    const formattedDate = DateTime.fromISO(date, { zone: 'utc' }).toFormat(
      'd/M/yy HH:mm'
    );
    return {
      index,
      text,
      rating,
      date: formattedDate,
      owner,
      user,
    };
  }

  useEffect(() => {
    setCommentData(formatComment(comment));
  }, [comment]);

  return (
    <div id={commentData.index} className="chat-meassge-main">


      <div className="comment-box">
        <h3 className="comment-box__username">{commentData.user?.name}</h3>
        <span className="comment-box__date">{commentData.date}</span>
        <img src={commentData.user?.avatar} className="comment-box__avatar"></img>
        <p className="comment-box__text">{commentData.text}</p>
        <div className="comment-box__buttons">
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
          <IconButton
            onClick={handleOnThankYou}
            aria-label="send thank You"
            title="send thank You"
          >
            <img
              className="iconthankYou"
              src={thankyouIcon}
              alt="thankyouIcon"
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
