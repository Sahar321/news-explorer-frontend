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
export default function ChatMessage({ cardData, comment, index, onThankYou, key}) {
  const [commentData, setCommentData] = useState({});

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

  function formatComment({ text, rating, date, owner, avatar, username }) {
    const formattedDate = DateTime.fromISO(date, { zone: 'utc' }).toFormat(
      'd/M/yy HH:mm'
    );
    return {
      index,
      text,
      rating,
      date: formattedDate,
      owner,
      avatar,
      username,
    };
  }

  useEffect(() => {
    setCommentData(formatComment(comment));
  }, [comment]);

  return (
    <div key={commentData.index} className="chat-meassge-main">
      {/*       <Userbox username={commentData.username} avatar={commentData.avatar}>
        <p>{commentData.text}</p>
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
      </Userbox> */}

      <div className="comment-box">
        <h3 className="comment-box__username">{commentData.username}</h3>
        <span className="comment-box__date">{commentData.date}</span>
        <img src={commentData.avatar} className="comment-box__avatar"></img>
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
