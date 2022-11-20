/* eslint no-unused-vars: 0 */
import React from 'react';
import './PopupWithForm.css';

export default function PopupWithForm() {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div className="popup">
      <div className="popup__container">
        <button type="button" className="button button_type_close"></button>
        <h2 className="popup__title">Sign In</h2>
        <form className="popup__form" name="sign-in" noValidate>
          <span className="popup__field-title popup__field-title_type_email">Email</span>
          <input type="email" className="popup__input popup__input_type_email" name="email" placeholder="Enter email" required />
          <span className="popup__input-error popup__input-error_type_email ">Invalid email address</span>
          <span className="popup__field-title popup__field-title_type_password">Password</span>
          <input type="password" className="popup__input popup__input_type_password" name="password" placeholder="Enter password" required />
          <span className="popup__input-error popup__input-error_type_password">Invalid password address</span>
          <button type="submit" className="button button_type_submit">Sign In</button>
        </form>
        <p className="popup__text">or <a href="#" className="popup__link">Sign up</a></p>
      </div>
    </div>

  );
}
//    <button type="button" className="button button_type_show-more">Show More</button>
