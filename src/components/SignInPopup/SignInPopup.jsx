import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

export default function SignInPopup({
  onSubmit,
  onClose,
  isOpen,
  onSignUpPopupClick,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    if (isValidEmail && isValidPassword) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [isValidEmail, isValidPassword]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(e.target.validity.valid);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsValidPassword(e.target.validity.valid);
  };
  const children2 = (
    <span className="popup__text">
      {'or '}
      <Link onClick={onSignUpPopupClick} className="popup__link">
        Sign up
      </Link>
    </span>
  );
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValidForm) return;
    onSubmit(email, password);
  };

  return (
    <PopupWithForm
      name="Signin"
      title="Sign in"
      onClose={onClose}
      isOpen={isOpen}
      submitTitle="Sign in"
      isValid={isValidForm}
      onSubmit={handleSubmit}
      bottomChildren={children2}
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
        value={email}
        onChange={handleEmailChange}
        required
      />
      <span
        className={`popup__input-error popup__input-error_valid_${isValidEmail}`}
      >
        Invalid email address
      </span>
      <label htmlFor="popup-signin-password" className="popup__field-label">
        Password
      </label>
      <input
        id="popup-signin-password"
        type="password"
        className="popup__input"
        name="password"
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <span
        className={`popup__input-error popup__input-error_valid_${isValidPassword}`}
      >
        Invalid password address
      </span>
    </PopupWithForm>
  );
}
