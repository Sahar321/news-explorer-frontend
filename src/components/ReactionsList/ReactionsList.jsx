/*eslint-disable   */
import React from 'react';
import Button from '@mui/material/Button';
import ReactionType from '../../constants/enums/ReactionType';
import './ReactionsList.css';

export default function ReactionsList(props) {
  console.log('ReactionsList', props);

  return (
    <div className="reactions__list">
      {reactions?.map(({ reactionId }, index) => (
        <Button key={index}>
          <img src={ReactionType[reactionId]} alt={reactionId}></img>
          {reactionId}
        </Button>
      ))}
    </div>
  );
}
