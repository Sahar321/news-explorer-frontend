import React, { useEffect } from 'react';
import './PopupWithMessage.css';

export default function Popup({
  onClose,
  isOpen,
  title,
  children,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen]);

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
          className="button button_type_close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>

        {children}
      </div>
    </div>
  );
}
