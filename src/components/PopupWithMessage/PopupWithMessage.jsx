import React from 'react';
import useCloseOnEscape from '../../utils/hooks/useCloseOnEscape';

import './PopupWithMessage.css';

export default function Popup({
  onClose,
  isOpen,
  title,
  children,
}) {
  useCloseOnEscape(isOpen, onClose);
  const handleOverlayClose = (evt) => {
    const popup = evt.target.classList;
    if (popup.contains('popup')) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_isVisible_${isOpen}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container popup__container_type_message">
        <button
          aria-label="Close Message Popup"
          className="button button_type_close popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>

        {children}
      </div>
    </div>
  );
}
