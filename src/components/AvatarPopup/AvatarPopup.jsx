/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../../utils/hooks/useFormAndValidation';

import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

export default function AvatarPopup(props) {
  const { onSubmit, onClose, isOpen, onError } = props;
  const { values, errors, handleChange, isValid } = useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) return;
    onSubmit(values);
  };

  return (
    <PopupWithForm
      name="Avatar"
      title="Avatar"
      onClose={onClose}
      isOpen={isOpen}
      submitTitle="Change Avatar"
      isValid={isValid}
      onSubmit={handleSubmit}
      onError={onError}
    >
      <label htmlFor="popup-avatar-link" className="popup__field-label">
        link
      </label>
      <input
        id="popup-avatar-link"
        type="text"
        className="popup__input"
        name="link"
        placeholder="Enter image link"
        value={values.link || ''}
        onChange={handleChange}
        autoComplete="on"
        required
      />
      {errors.link && <span className="popup__input-error">{errors.link}</span>}
    </PopupWithForm>
  );
}
