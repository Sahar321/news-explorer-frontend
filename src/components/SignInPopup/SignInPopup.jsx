/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../../utils/hooks/useFormAndValidation';

import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

export default function SignInPopup(props) {
  const { onSubmit, onClose, isOpen, onSignUpPopupClick, onError, children } =
    props;
  const { values, errors, handleChange, isValid } = useFormAndValidation();

  const children2 = (
    <>
      <span className="popup__text">
        {'or '}
        <Link onClick={onSignUpPopupClick} className="popup__link">
          Sign up
        </Link>
      </span>
      <hr className="popup__line" />
      {children}
    </>
  );
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) return;
    onSubmit(values);
  };

  return (
    <PopupWithForm
      name="Signin"
      title="Sign in"
      onClose={onClose}
      isOpen={isOpen}
      submitTitle="Sign in"
      isValid={isValid}
      onSubmit={handleSubmit}
      bottomChildren={children2}
      otherChildren={children}
      onError={onError}
    >
      <label htmlFor="popup-signin-email" className="popup__field-label">
        Email
      </label>
      <input
        id="popup-signin-email"
        type="email"
        className="popup__input"
        name="email"
        placeholder="Enter email"
        value={values.email || ''}
        onChange={handleChange}
        required
      />
      {errors.email && (
        <span className="popup__input-error">{errors.email}</span>
      )}
      <label htmlFor="popup-signin-password" className="popup__field-label">
        Password
      </label>
      <input
        id="popup-signin-password"
        type="password"
        className="popup__input"
        name="password"
        minLength="6"
        maxLength="20"
        placeholder="Enter password"
        value={values.password || ''}
        onChange={handleChange}
        autoComplete="on"
        required
      />
      {errors.password && (
        <span className="popup__input-error">{errors.password}</span>
      )}
    </PopupWithForm>
  );
}
