/*eslint-disable */
import React, { useEffect, useContext, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import InfoTable from '../components/InfoTable/InfoTable';
import './Profile.css';

export default function Profile({ onProfileEditClick, currentUser, onPersonalInfoSubmit }) {
  return (
    <section className="profile">
      <div className="profile__info-wrapper">
        <h2 className="profile__header">Profile</h2>
        <img
          src={currentUser?.avatar}
          alt="User Avatar"
          className="profile__avatar"
        />
        <p className="profile__name">{currentUser?.name}</p>
        <p className="profile__title">{currentUser?.motto}</p>
        <Button
          className="profile__edit-button"
          variant="outlined"
          endIcon={<EditIcon />}
          onClick={onProfileEditClick}
        >
          Edit
        </Button>
      </div>

      <InfoTable currentUser={currentUser} onSubmit={onPersonalInfoSubmit} header={'Personal Information'} />

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
