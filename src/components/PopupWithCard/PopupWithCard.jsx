/*eslint-disable*/
import React, { useState } from 'react';
import Comment from '../Comment/Comment.jsx';
import ChatMessage from '../ChatMessage/ChatMessage.jsx';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Button from '@mui/material/Button';
import { SCREEN_WIDTHS } from '../../constants/constants';
import useCloseOnEscape from '../../utils/hooks/useCloseOnEscape';
import './PopupWithCard.css';
import useScreenWidth from '../../utils/hooks/useScreenWidth';
import InputLabel from '@mui/material/InputLabel';
export default function PopupWithCard({
  cardData,
  onClose,
  isOpen,
  onCommentSubmit,
}) {
  const screenWidth = useScreenWidth();
  useCloseOnEscape(isOpen, onClose);
  const [isWriteCommentOpen, setIsWriteCommentOpen] = useState(false);
  const { TABLET_SIZE_WIDTH } = SCREEN_WIDTHS;
  const isScreenSmallerThanTablet = screenWidth < TABLET_SIZE_WIDTH;
  const { comments } = cardData;
  const renderButtonComment = () => {
    if (!isScreenSmallerThanTablet) return null;
    const handleCommentButton = () => {
      setIsWriteCommentOpen(!isWriteCommentOpen);
    };
    return (
      <Button onClick={handleCommentButton} className="comment__write-button">
        <HistoryEduIcon className="comment__write-icon" />
        {isWriteCommentOpen ? 'Close Comment' : ''}
      </Button>
    );
  };
  const handleOnCommentSubmit = (value) => {
    const { link } = cardData;
    onCommentSubmit({ link, text: value });
    setIsWriteCommentOpen(false);
  };

  return (
    <div className={`popup popup_isVisible_${isOpen}`}>
      <div className="popup__container popup__container_type_card">
        <button
          aria-label="Close Popup"
          className="button button_type_close popup__button-close_type_card"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title popup__title_type_card">Card Date</h2>

        <div className="popup__comments">
          {renderButtonComment()}

          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Comment
            onCommentSubmit={handleOnCommentSubmit}
            isOpen={isScreenSmallerThanTablet && isWriteCommentOpen}
          />
          <div className="message-list">
            {comments?.map((comment, index) => (
              <ChatMessage
                key={comment.id}
                index={index + 1}
                comment={comment}
              />
            ))}
          </div>
        </div>
        {screenWidth > TABLET_SIZE_WIDTH && (
          <Comment onCommentSubmit={handleOnCommentSubmit} isOpen={true} />
        )}
      </div>
    </div>
  );
}
