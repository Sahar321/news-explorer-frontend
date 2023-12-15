/*eslint-disable*/
import React, { useRef, useEffect, useState } from 'react';
import useCloseOnEscape from '../../utils/hooks/useCloseOnEscape';
import Preloader from '../Preloader/Preloader';
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

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const formRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(false);
    setIsSubmitButtonDisabled(!formRef.current.checkValidity());
    console.log('checkValidity');
  }, [isOpen, isValid, onError]);

  useCloseOnEscape(isOpen, onClose);

  const onSubmitHandler = (evt) => {
    setIsSubmitButtonDisabled(true);
    setIsLoading(true);
    onSubmit(evt);
  };

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
      <div className={`popup__container`}>
        <button
          aria-label="Close Popup"
          className="button button_type_close popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__content">
          <h2 className="popup__title">{title}</h2>
          <form
            className="popup__form"
            noValidate
            name={name}
            ref={formRef}
            onSubmit={onSubmitHandler}
          >
            {children}
            {onError?.visible && (
              <span
                className="popup__server-error"
                id="popup-signin-email-error"
              >
                {onError?.message}
              </span>
            )}
            <button
              aria-label="submit"
              type="submit"
              disabled={isSubmitButtonDisabled}
              className="button button_type_submit"
            >
              <Preloader
                isVisible={isLoading}
                className="search-loading__icon search-loading__icon_type_button"
              />
              {!isLoading && submitTitle}
            </button>
          </form>

          {bottomChildren}
        </div>
      </div>
    </div>
  );
}
