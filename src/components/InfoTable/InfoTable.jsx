/*eslint-disable */
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import useFormAndValidation from '../../utils/hooks/useFormAndValidation';

import './InfoTable.css';

const InfoTable = ({ header }) => {
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const data = [
    { label: 'First name', type: 'text', value: 'Sam', name: 'first-name' },
    { label: 'Last name', type: 'text', value: 'Smith', name: 'last-name' },
    {
      label: 'Email',
      type: 'email',
      value: 'ssad3ds@gmail.com',
      name: 'email',
    },
    { label: 'Phone', type: 'tel', value: '0523554984', name: 'phone' },
  ];

  const dataValidation = data.reduce((acc, item) => {
    acc[item.name] = item.value;
    return acc;
  }, {});

  const { values, errors, handleChange, isValid } =
    useFormAndValidation(dataValidation);

  useEffect(() => {
    console.log('errors', errors);
    console.log('isValid', isValid);
  }, [errors]);
  const toggleEditMode = () => {
    setIsEditModeActive(!isEditModeActive);
  };

  const renderActionButtons = () => {
    if (isEditModeActive) {
      return (
        <>
          <Button
            className="info-table__edit-button"
            variant="outlined"
            endIcon={<ClearIcon />}
            onClick={toggleEditMode}
          >
            Cancel
          </Button>
          <Button
            className="info-table__edit-button"
            variant="outlined"
            endIcon={<SaveIcon />}
            onClick={onSubmit}
          >
            Save
          </Button>
        </>
      );
    }
    return (
      <Button
        className="info-table__edit-button"
        variant="outlined"
        endIcon={<EditIcon />}
        onClick={toggleEditMode}
      >
        Edit
      </Button>
    );
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) return;
    onSubmit(values);
  };

  return (
    <form noValidate onSubmit={onSubmit} id="presonelSD" className="info-table">
      <h2 className="info-table__header">{header}</h2>
      <div className="info-table__edit-buttons-wrapper">
        {renderActionButtons()}
      </div>
      <ul className="info-table__items">
        {data.map(({ label, value, name, type }, index) => (
          <li className="info-table__item" key={index}>
            <label htmlFor={name} className="info-table__label">
              {label}
            </label>
            {isEditModeActive ? (
              <>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={values[name] || ''}
                  onChange={handleChange}
                  className="info-table__input"
                  required
                />
                <span dir="rtl" className="info-table__error">
                  {errors[name]}
                </span>
              </>
            ) : (
              <span className="info-table__value">{value}</span>
            )}
          </li>
        ))}
      </ul>
    </form>
  );
};
export default InfoTable;
