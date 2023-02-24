import React from 'react';
import useCloseOnEscape from '../../utils/hooks/useCloseOnEscape';
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
  onError,
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
      <div className="popup__container">
        <button
          aria-label="Close Popup"
          className="button button_type_close popup__button-close"
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
          {onError?.visible && (
            <span className="popup__server-error" id="popup-signin-email-error">
              {onError?.message}
            </span>
          )}
          <button
            aria-label="submit"
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
