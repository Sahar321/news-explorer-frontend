/* eslint no-unused-vars: 0 */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

export default function SignInPopup({
  handleSubmit,
  onClose,
  isOpen,
  onSignUpPopupClick,
}) {
  const [loggedIn, setLoggedIn] = React.useState(true);

  const children2 = (
    <span className="popup__text">
      {'or '}
      <Link onClick={onSignUpPopupClick} className="popup__link">
        Sign up
      </Link>
    </span>
  );
  return (
    <PopupWithForm
      name="Signin"
      title="Sign in"
      onClose={onClose}
      isOpen={isOpen}
      submitTitle="Sign in"
      handleSubmit={handleSubmit}
      bottomChildren={children2}
    >
      <span className="popup__field-title">
        Email
      </span>
      <input
        type="email"
        className="popup__input"
        name="email"
        placeholder="Enter email"
        required
      />
      <span className="popup__input-error">
        Invalid email address
      </span>
      <span className="popup__field-title">
        Password
      </span>
      <input
        type="password"
        className="popup__input"
        name="password"
        placeholder="Enter password"
        required
      />
      <span className="popup__input-error">
        Invalid password address
      </span>
    </PopupWithForm>
  );
}
//    <button type="button" className="button button_type_show-more">Show More</button>
