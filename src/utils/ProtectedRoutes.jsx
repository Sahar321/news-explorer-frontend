import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import LoginState from '../constants/enums/LoginState';
import PagePreloader from '../components/PagePreloader/PagePreloader.jsx';

export default function ProtectedRoutes({ loggedIn }) {
  if (loggedIn === LoginState.PENDING) {
    return <PagePreloader/>;
  }
  if (loggedIn === LoginState.LOGGED_IN) {
    return <Outlet />;
  }
  if (loggedIn === LoginState.LOGGED_OUT) {
    return <Navigate to="/" />;
  }
}
