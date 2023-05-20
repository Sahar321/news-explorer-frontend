import React, { useRef, useEffect, useState } from 'react';
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
  const [isScrenHeightBigger, setIsScrenHeightBigger] = useState(false);
  useCloseOnEscape(isOpen, onClose);
  const handleOverlayClose = (evt) => {
    const popup = evt.target.classList;
    if (popup.contains('popup')) {
      onClose();
    }
  };
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    const handleResize = () => {
      const elm = element.children[0];
      if (!elm.classList.contains('popup__container')) {
        return;
      }

      const elementHeight = elm.clientHeight;
      const screenHeight = window.innerHeight;

      setIsScrenHeightBigger(elementHeight > screenHeight);
    };

    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div
      ref={elementRef}
      className={`popup popup_isVisible_${isOpen}`}
      onClick={handleOverlayClose}
    >
      <div
        className={`popup__container ${
          isScrenHeightBigger && 'popup__form_fix_hight'
        }`}
      >
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
