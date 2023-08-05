/*eslint-disable */
import React, { useEffect, useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import useFormAndValidation from '../../utils/hooks/useFormAndValidation';

import './InfoTable.css';

const InfoTable = ({ header }) => {
  const currentUser = useContext(CurrentUserContext);
  const [isEditMode, setIsEditMode] = useState(true);
  const [leftData, setLeftData] = useState([]);
  const [rightData, setRightData] = useState([]);
  const { values, errors, handleChange, isValid } = useFormAndValidation();
  const data = [
    { label: 'First name', value: 'Sam', name: 'first-name' },
    { label: 'Last name', value: 'Smith', name: 'last-name' },
    { label: 'Email', value: 'ssad3ds@gmail.com', name: 'email' },
    { label: 'Phone', value: '0523554984', name: 'phone' },
  ];

  useEffect(() => {
    const leftColumn = [];
    const rightColumn = [];
    data.forEach((item, index) => {
      if (index % 2 === 0) {
        leftColumn.push(item);
      } else {
        rightColumn.push(item);
      }
    });

    setLeftData(leftColumn);
    setRightData(rightColumn);
  }, []);

  const handleEditButtonClick = () => {
    setIsEditMode(!isEditMode);
  };
  const handleCancelButtonClick = () => {
    setIsEditMode(!isEditMode);
  };
  const handleSubmitClick = () => {
    console.log('handleSubmitClick', isValid);
  };

  useEffect(() => {
    console.log('isEditMode', isEditMode);
  }, [isEditMode]);

  const renderEditButtonsMode = () => {
    return (
      <>
        {isEditMode && (
          <Button
            className="info-table__edit-button"
            variant="outlined"
            endIcon={<EditIcon />}
            onClick={handleEditButtonClick}
          >
            Edit
          </Button>
        )}
        {!isEditMode && (
          <>
            <Button
              className="info-table__edit-button"
              variant="outlined"
              endIcon={<ClearIcon />}
              onClick={handleCancelButtonClick}
            >
              Cancel
            </Button>
            <Button
              className="info-table__edit-button"
              variant="outlined"
              endIcon={<SaveIcon />}
              onClick={handleSubmitClick}
            >
              Save
            </Button>
          </>
        )}
      </>
    );
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) return;
    onSubmit(values);
  };

  return (
    <form noValidate onSubmit={onSubmit} id="presonelSD" className="info-table">
      <h3 className="info-table__header">{header}</h3>
      <div className="info-table__edit-buttons-wrapper">
        {renderEditButtonsMode()}
      </div>
      <dl className="info-table__dl">
        {leftData.map(({ label, value, name }) => (
          <React.Fragment key={name}>
            <dt className="info-table__label">{label}</dt>
            {isEditMode ? (
              <dd className="info-table__value">{value}</dd>
            ) : (
              <input
                name={name}
                value={values[name] || ''}
                onChange={handleChange}

                className="info-table__input"
                required
              />
            )}
          </React.Fragment>
        ))}
      </dl>
      <dl className="info-table__dl">
        {rightData.map(({ label, value, name }) => (
          <React.Fragment key={name}>
            <dt className="info-table__label">{label}</dt>
            {isEditMode ? (
              <dd className="info-table__value">{value}</dd>
            ) : (
              <input
                name={name}
                onChange={handleChange}
                value={values[name] || ''}
                className="info-table__input"
                required
              />
            )}
          </React.Fragment>
        ))}
      </dl>
    </form>
  );
};
export default InfoTable;
