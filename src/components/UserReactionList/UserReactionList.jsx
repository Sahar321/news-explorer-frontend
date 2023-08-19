/*eslint-disable   */

import React, { useEffect } from 'react';
import './UserReactionList.css';
import Userbox from '../Userbox/Userbox';
import Button from '@mui/material/Button';
import imageNotAvailable from '../../images/Image_not_available.png';
import ReactionStats from '../ReactionStats/ReactionStats';
import { Height } from '@mui/icons-material';

export default function UserReactionList({ data }) {
  const [massage, setMessage] = React.useState('');
  const [reactions, setReactions] = React.useState([]);
  useEffect(() => {
    setReactions(data);
    return () => {
      setMessage('');
    };
  }, [data]);

  const handleFilterClick = ({ target }) => {
    const filter = target.id.toLowerCase();
    if (!filter) return;
    const filteredReactions = data.filter((reaction) => {
      if (filter === 'all') return true;
      return reaction.type.toLowerCase() === filter;
    });

    if (filteredReactions.length === 0) {

      setMessage(`There are no matches based on the selected filter.`);
    } else {
      setMessage('');
    }
    setReactions(filteredReactions);
  };
  const gradientColor =
    'linear-gradient(45deg,hsl(240deg 100% 20%) 0%,hsl(289deg 100% 21%) 11%,hsl(315deg 100% 27%) 22%,hsl(329deg 100% 36%) 33%,hsl(337deg 100% 43%) 44%,hsl(357deg 91% 59%) 56%,hsl(17deg 100% 59%) 67%,hsl(34deg 100% 53%) 78%,hsl(45deg 100% 50%) 89%,hsl(55deg 100% 50%) 100%)';
  return (
    <>
{/*       <p className="popup__reactions-filters-header">Filter</p> */}
      <ul className="popup__reactions-filter" onClick={handleFilterClick}>
        <li>
          <Button
            id="all"
            style={{
              background: gradientColor,
              color: 'white',
              fontWeight: '900',
              fontSize: '16px',
              letterSpacing:"3px",
            }}
            className="popup__reactions-filter-button"
          >
            All
          </Button>
        </li>
        <li>
          <Button
            id="LOL"
            style={{ backgroundColor: '#f1c40f', color: 'white' }}
            className="popup__reactions-filter-button"
          >
            LOL
          </Button>
        </li>
        <li>
          <Button
            id="WOW"
            style={{ backgroundColor: '#f39c12', color: 'white' }}
            className="popup__reactions-filter-button"
          >
            WOW
          </Button>
        </li>
        <li>
          <Button
            id="SAD"
            style={{ backgroundColor: '#2c3e50', color: 'white' }}
            className="popup__reactions-filter-button"
          >
            SAD
          </Button>
        </li>
        <li>
          <Button
            id="LIKE"
            style={{ backgroundColor: '#2980b9', color: 'white' }}
            className="popup__reactions-filter-button"
          >
            LIKE
          </Button>
        </li>
        <li>
          <Button
            id="LOVE"
            style={{ backgroundColor: '#e74c3c', color: 'white' }}
            className="popup__reactions-filter-button"
          >
            love
          </Button>
        </li>
      </ul>

      <ul className="popup__reactions-list">
        {massage && <p className='popup_reactions-list__not-found'>{massage}</p>}
        {reactions?.map((stats, index) => (
          <li className="popup__reactions-item">
            <Userbox
              key={index}
              username={stats.name}
              avatar={stats.avatar || imageNotAvailable}
            >
              <ReactionStats stats={stats} />
            </Userbox>
          </li>
        ))}

      </ul>
    </>
  );
}
