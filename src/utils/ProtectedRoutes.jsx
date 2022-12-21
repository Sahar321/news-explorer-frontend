import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoutes() {
  // const { currentUser } = useAuth();
  const currentUser = true;

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}
