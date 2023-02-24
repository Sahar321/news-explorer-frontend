/*eslint-disable*/
import { Button } from '@mui/material';
import React from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import ReportIcon from '@mui/icons-material/Report';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import userAvatar from '../../images/icons/user_avatar.svg';
import './ChatMessage.css';

export default function comment() {

  return (
    <div
      className="chat-message__warper"
    >
      <div className="chat-message__author-Info">
        <img
          src={userAvatar}
          alt="avatar"
          className="chat-message__avatar"
        ></img>
        <label className="chat-message__author">Sahar Moshe</label>
        <label className="chat-message__date">05/10/21 10:30</label>
        <label className="chat-message__number">#651</label>
      </div>
      <div className="chat-message__message-warper">
        <p className="chat-message__text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scramble
        </p>
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
