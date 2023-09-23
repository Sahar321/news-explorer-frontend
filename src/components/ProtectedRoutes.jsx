/* eslint-disable*/
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import LoginState from '../constants/enums/LoginState';
import PagePreloader from './PagePreloader/PagePreloader.jsx';
export default function ProtectedRoutes({ loggedIn }) {
  switch (loggedIn) {
    case LoginState.PENDING:
      console.log('ProtectedRoutes', 'LoginState.PENDING', loggedIn);
      return <PagePreloader />;
    case LoginState.LOGGED_IN:
      console.log('ProtectedRoutes', 'LoginState.LOGGED_IN', loggedIn);
      return <Outlet />;
    case LoginState.LOGGED_OUT:
      console.log('ProtectedRoutes', 'LoginState.LOGGED_OUT', loggedIn);
      return <Navigate to="/signin" />;
    default:
      console.log('ProtectedRoutes', 'default', loggedIn);
      return <PagePreloader />;
  }
}
