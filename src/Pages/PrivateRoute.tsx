import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { ROLE } from './roles';
import Loader from 'components/Loader/Loader';

const PrivateRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: ROLE[];
}) => {
  let location = useLocation();

  const { isLogged, user } = useContext(AppContext);

  if (isLogged === null) {
    return <Loader />;
  }

  // const userHasRequiredRole = user && roles.includes(user.role) ? true : false;
  const userHasRequiredRole = user && roles.includes(user.role) ? true : false;

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  if (isLogged && !userHasRequiredRole) {
    //if user go to defeult user page else default admin page for admin
    if (user) {
      return <Navigate to={`/${user.role}/ranking`} />; // build your won access denied page (sth like 404)
    } else {
      return <Navigate to={'/login'} />;
    }
  }

  return children;
};

export default PrivateRoute;
