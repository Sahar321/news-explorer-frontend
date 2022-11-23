/* eslint no-unused-vars: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */
import { array } from 'prop-types';
import React, { useEffect } from 'react';
import './PopupWithForm.css';

export default function PopupWithForm({
  name,
  submitTitle,
  onSubmit,
  onClose,
  isOpen,
  title,
  children,
  bottomChildren,
  isValid,
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
      <div className="popup__container">
        <button
          className="button button_type_close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          noValidate
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            disabled={!isValid}
            className="button button_type_submit"
          >
            {submitTitle}
          </button>
        </form>
        {bottomChildren}
      </div>
    </div>
  );
}
