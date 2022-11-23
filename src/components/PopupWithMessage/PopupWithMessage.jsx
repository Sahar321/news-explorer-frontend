/* eslint no-unused-vars: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */
import { array } from 'prop-types';
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
