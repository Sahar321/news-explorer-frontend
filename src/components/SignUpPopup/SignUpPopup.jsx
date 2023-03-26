/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../../utils/hooks/useFormAndValidation';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

export default function SignUpPopup({
  onSubmit,
  onClose,
  isOpen,
  onSignInPopupClick,
  onError,
}) {
  const { values, errors, handleChange, isValid } = useFormAndValidation();

  const children2 = (
    <span className="popup__text">
      {'or '}
      <Link onClick={onSignInPopupClick} className="popup__link">
        Sign in
      </Link>
    </span>
  );
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) return;
    onSubmit(values);
  };

  return (
    <PopupWithForm
      name="Signup"
      title="Sign up"
      submitTitle="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      isValid={isValid}
      onSubmit={handleSubmit}
      bottomChildren={children2}
      onError={onError}
    >
      <label htmlFor="popup-signup-email" className="popup__field-label">
        Email
      </label>
      <input
        id="popup-signup-email"
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
      <label htmlFor="popup-signup-password" className="popup__field-label">
        Password
      </label>
      <input
        id="popup-signup-password"
        type="password"
        className="popup__input"
        name="password"
        placeholder="Enter password"
        value={values.password || ''}
        onChange={handleChange}
        autoComplete="on"
        required
      />
      {errors.password && (
        <span className="popup__input-error">{errors.password}</span>
      )}

      <label htmlFor="popup-signup-username" className="popup__field-label">
        Username
      </label>
      <input
        id="popup-signup-username"
        type="text"
        className="popup__input"
        name="name"
        placeholder="Enter username"
        value={values.name || ''}
        onChange={handleChange}
        minLength="5"
        maxLength="30"
        required
      />
      {errors.username && (
        <span className="popup__input-error">{errors.name}</span>
      )}
    </PopupWithForm>
  );
}

