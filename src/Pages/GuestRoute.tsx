import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from 'components/Loader/Loader';

export default function GuestRoute() {
  const { isLogged, user } = useContext(AppContext);
  if (isLogged == null)
    return (
      <div
        style={{ display: 'grid', minHeight: '100vh', placeItems: 'center' }}
      >
        <Loader />
      </div>
    );

  return !isLogged ? <Outlet /> : <Navigate to={`/${user?.role}/ranking`} />;
}
