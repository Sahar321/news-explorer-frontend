/*eslint-disable */
import React, { useEffect, useContext, useState } from 'react';
import NewsCardList from '../components/NewsCardList/NewsCardList.jsx';


import CurrentUserContext from '../contexts/CurrentUserContext';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import SideMenu from '../components/SideMenu/SideMenu.jsx';
import InfoTable from '../components/InfoTable/InfoTable';
  import './Profile.css';
import ErrorBoundary from '../ErrorBoundary.jsx';

export default function Profile({ setAppStyles, onAvatarClick, onProfileEdit }) {
  const currentUser = useContext(CurrentUserContext);


  const personalInfoData = [
    { label: 'First name', value: 'Sam', className: 'first-name' },
    { label: 'Last name', value: 'Smith', className: 'last-name' },
    { label: 'Email', value: 'ssad3ds@gmail.com', className: 'email' },
    { label: 'Phone', value: '0523554984', className: 'phone' },
  ];

  const addressData = [
    { label: 'Country', value: 'Israel', className: 'country' },
    { label: 'City', value: 'Modiin', className: 'city' },
    { label: 'Postal Code', value: '61564', className: 'postal-code' },
  ];

  return (

      <section className="profile">
        <div className="profile__info-wrapper">
          <h2 className="profile__header">Profile</h2>
          <img
            src={currentUser.avatar}
            alt="User Avatar"
            className="profile__avatar"
          />
          <p className="profile__name">Sam</p>
          <p className="profile__title">Doctor</p>
          <Button
            className="profile__edit-button"
            variant="outlined"
            endIcon={<EditIcon />}
            onClick={onProfileEdit}
          >
            Edit
          </Button>
        </div>

        <InfoTable header={'Personal Information'} />

        {/*         <section className="personal-info">
          <h3 className="personal-info__header">Personal Information</h3>
          {personalInfoData.map((info) => (
            <label key={info.label} className={`personal-info__label`}>
              {info.label}
              <span className={`personal-info__${info.className}`}>
                {info.value}
              </span>
            </label>
          ))}
          <Button
            className="personal-info__edit-button"
            variant="outlined"
            endIcon={<EditIcon />}
          >
            Edit
          </Button>
        </section>

        <address className="address-info">
          <h3 className="address__header">Address</h3>
          {addressData.map((address) => (
            <label
              key={address.label}
              className={`address__label address__${address.className}`}
            >
              {address.label}
              <span>{address.value}</span>
            </label>
          ))}
          <Button
            className="address__edit-button"
            variant="outlined"
            endIcon={<EditIcon />}
          >
            Edit
          </Button>
        </address> */}
      </section>

  );
}
