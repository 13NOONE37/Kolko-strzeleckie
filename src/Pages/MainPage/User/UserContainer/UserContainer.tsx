import React, { FC, useContext } from 'react';
import { Outlet } from 'react-router';
import AppContext from 'store/AppContext';
import Header from 'components/Header/Header';
import UserNavbar from 'components/Nav/ReadyVariations/UserNavbar';

import { ReactComponent as Logout } from 'assets/logout.svg';
import styles from './UserContainer.module.css';
import useLogout from 'utils/useLogout';

const UserContainer: FC = () => {
  const { user } = useContext(AppContext);
  const { data, loading, logout } = useLogout();

  return (
    <div className={styles.container}>
      <Header
        text={`${user?.firstName} ${user?.secondName}`}
        CTA={{
          Icon: Logout,
          text: loading ? '...' : 'Wyloguj się',
          callback: logout,
        }}
      />
      <div className={styles.content}>
        <Outlet />
      </div>
      <UserNavbar />
    </div>
  );
};
export default UserContainer;
