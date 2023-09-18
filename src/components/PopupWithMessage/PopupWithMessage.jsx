/*eslint-disable*/
import React, { useEffect } from 'react';
import useCloseOnEscape from '../../utils/hooks/useCloseOnEscape';

import './PopupWithMessage.css';

export default function Popup({
  onClose,
  isOpen,
  title,
  children,
  id,
  closeOnOutsideClick = true,
  isCloseButtonVisible = true,
  className,
}) {
  useCloseOnEscape(isOpen, onClose);
  const handleOverlayClose = (evt) => {
    if (!closeOnOutsideClick) return;
    const itsId = evt.target.id === id;
    const popupClassList = evt.target.classList;

    if (popupClassList.contains('popup') && itsId) {
      onClose();
    }
  };

  return (
    <div
      id={id}
      className={`popup popup_isVisible_${isOpen}`}
      onClick={handleOverlayClose}
    >
      <div
        className={`popup__container popup__container_type_message  ${className}`}
      >
        {isCloseButtonVisible && (
          <button
            aria-label="Close Message Popup"
            className="button button_type_close popup__button-close"
            type="button"
            onClick={onClose}
          ></button>
        )}
        <h2 className="popup__title">{title}</h2>

        {children}
      </div>
    </div>
  );
}
