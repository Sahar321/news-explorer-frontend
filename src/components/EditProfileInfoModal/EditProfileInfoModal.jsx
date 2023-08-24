/*eslint-disable*/
import React from 'react';
import useFormAndValidation from '../../utils/hooks/useFormAndValidation';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

export default function EditProfileInfoModal({
  onSubmit,
  onClose,
  isOpen,
  onError,
}) {
  const { values, errors, handleChange, isValid } = useFormAndValidation();


  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) return;
    onSubmit(values);
  };

  return (
    <PopupWithForm
      name="editProfile"
      title="Edit profile"
      submitTitle="Update Profile"
      onClose={onClose}
      isOpen={isOpen}
      isValid={isValid}
      onSubmit={handleSubmit}
      onError={onError}
    >
      <label htmlFor="popup-info-name" className="popup__field-label">
        name
      </label>
      <input
        id="popup-info-name"
        type="text"
        className="popup__input"
        name="name"
        placeholder="Enter name"
        value={values.name || ''}
        onChange={handleChange}
        minLength="6"
        maxLength="30"
        required
      />
      {errors.name && (
        <span className="popup__input-error">{errors.name}</span>
      )}
      <label htmlFor="popup-info-motto" className="popup__field-label">
        Motto
      </label>
      <input
        id="popup-info-motto"
        type="text"
        className="popup__input"
        name="motto"
        placeholder="What is your motto?"
        value={values.motto || ''}
        onChange={handleChange}
        autoComplete="on"
        minLength="0"
        maxLength="50"
        required
      />
      {errors.motto && (
        <span className="popup__input-error">{errors.motto}</span>
      )}

      <label htmlFor="popup-info-avatar" className="popup__field-label">
        Avatar link
      </label>
      <input
        id="popup-info-avatar"
        type="url"
        className="popup__input"
        name="avatar"
        placeholder="Enter avatar URL"
        value={values.avatar || ''}
        onChange={handleChange}
        required
      />
      {errors.avatar && (
        <span className="popup__input-error">{errors.avatar}</span>
      )}
    </PopupWithForm>

  );
}

