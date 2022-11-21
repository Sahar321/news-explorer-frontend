/* eslint no-unused-vars: 0 */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

export default function SignUpPopup({
  handleSubmit,
  onClose,
  isOpen,
  onSignInPopupClick,
}) {
  const [loggedIn, setLoggedIn] = React.useState(true);

  const children2 = (
    <span className="popup__text">
      {'or '}
      <Link onClick={onSignInPopupClick} className="popup__link">
        Sign in
      </Link>
    </span>
  );
  return (
    <PopupWithForm
      name="signup"
      title="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      submitTitle="Sign up"
      handleSubmit={handleSubmit}
      bottomChildren={children2}
    >
      <span className="popup__field-title">Email</span>
      <input
        type="email"
        className="popup__input"
        name="email"
        placeholder="Enter email"
        required
      />
      <span className="popup__input-error">Invalid email address</span>

      <span className="popup__field-title">Password</span>
      <input
        type="password"
        className="popup__input"
        name="password"
        placeholder="Enter password"
        required
      />
      <span className="popup__input-error">Invalid password</span>

      <span className="popup__field-title">Username</span>
      <input
        type="password"
        className="popup__input"
        name="password"
        placeholder="Enter your username"
        required
      />
      <span className="popup__input-error">Invalid username</span>
    </PopupWithForm>
  );
}
//    <button type="button" className="button button_type_show-more">Show More</button>
