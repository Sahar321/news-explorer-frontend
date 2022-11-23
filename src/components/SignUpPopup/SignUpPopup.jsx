/* eslint no-unused-vars: 0 */
/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';
import RegexPatterns from '../../constants/constants';

export default function SignUpPopup({
  onSubmit,
  onClose,
  isOpen,
  onSignInPopupClick,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    if (isValidEmail && isValidPassword && isValidUsername) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [isValidEmail, isValidPassword, isValidUsername]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(e.target.validity.valid);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsValidPassword(e.target.validity.valid);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsValidUsername(e.target.validity.valid);
  };
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
    if (!isValidForm) return;
    onSubmit(email, password, username);
  };

  return (
    <PopupWithForm
      name="Signup"
      title="Sign up"
      submitTitle="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      isValid={isValidForm}
      onSubmit={handleSubmit}
      bottomChildren={children2}
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
        value={email}
        onChange={handleEmailChange}
        required
      />
      <span
        className={`popup__input-error popup__input-error_valid_${isValidEmail}`}
      >
        Invalid email address
      </span>
      <label htmlFor="popup-signup-password" className="popup__field-label">
        Password
      </label>
      <input
        id="popup-signup-password"
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
      <label htmlFor="popup-signup-username" className="popup__field-label">
        Password
      </label>
      <input
        id="popup-signup-username"
        type="text"
        className="popup__input"
        name="username"
        placeholder="Enter username"
        value={username}
        onChange={handleUsernameChange}
        minLength="5"
        required
      />
      <span
        className={`popup__input-error popup__input-error_valid_${isValidUsername}`}
      >
        Invalid username
      </span>
    </PopupWithForm>
  );
}
//    <button type="button" className="button button_type_show-more">Show More</button>
