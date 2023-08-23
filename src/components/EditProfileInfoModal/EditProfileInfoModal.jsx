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
        Full name
      </label>
      <input
        id="popup-info-name"
        type="text"
        className="popup__input"
        name="fullName"
        placeholder="Enter Full name"
        value={values.fullName || ''}
        onChange={handleChange}
        minLength="6"
        maxLength="30"
        required
      />
      {errors.fullName && (
        <span className="popup__input-error">{errors.fullName}</span>
      )}
      <label htmlFor="popup-info-title" className="popup__field-label">
        Title
      </label>
      <input
        id="popup-info-title"
        type="text"
        className="popup__input"
        name="title"
        placeholder="Enter Title"
        value={values.title || ''}
        onChange={handleChange}
        autoComplete="on"
        minLength="0"
        maxLength="50"
        required
      />
      {errors.title && (
        <span className="popup__input-error">{errors.title}</span>
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

