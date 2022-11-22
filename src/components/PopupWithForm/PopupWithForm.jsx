/* eslint no-unused-vars: 0 */
/* eslint react/prop-types: 0 */
/* eslint consistent-return: 0 */
import React, { useEffect } from 'react';
import './PopupWithForm.css';

export default function PopupWithForm({
  name,
  submitTitle,
  handleSubmit,
  onClose,
  isOpen,
  title,
  children,
  bottomChildren,
}) {
  const [loggedIn, setLoggedIn] = React.useState(true);

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
    if (evt.target.classList.contains('popup')) {
      onClose();
    }
  };

  return (
    <div onClick={handleOverlayClose} className={`popup popup_isVisible_${isOpen}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          isOpen={isOpen}
          type="button"
          className="button button_type_close"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} noValidate>
          {children}
          <button
            onClick={handleSubmit}
            type="submit"
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
